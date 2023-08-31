import { useEffect, useState } from "react"
import './ProductEditor.css'
import { readAllSubcategory, readCategory } from "../../service/categoryService";
import { createProduct, findOneProduct, updateProduct } from "../../service/productService";
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { deleteImg, uploadImg } from "../../service/uploadService";
import testUrl from "../../service/testURL";
import { deletePDF, uploadPDF } from "../../service/pdfService";

const ProductEditor = ({ setMode })=>{
    const { state } = useLocation();
    const navigate = useNavigate()

    const [ loading, setLoading ] = useState(true)
    const [ mainCategory, setMainCategory ] = useState(null)
    const [ subCategory, setSubCategory ] = useState(null)
    const [ checkedCategory, setCheckedCategory ] = useState('')
    const [ filteredSub, setFilteredSub ] = useState([])

    const [ input, setInput ] = useState({
        _id : "",
        nameEng : "",
        name : "",
        category : "",
        category_2 : "",
        content : "",
        contentEng : "",
        pdf : "",
        images : []
    });
    console.log(input)
    const { _id, nameEng, name, category, category_2, content, contentEng, pdf, images } = input

    const handleInput = (e)=>{
        setInput({
            ...input,
            [ e.target.name ] : e.target.value
        })
    }
    const handleImage = async (e)=>{
        const image = e.target.files[0]
        const formData = new FormData();
        formData.append('image', image);
        console.log(formData)
        await uploadImg(formData)
            .then(res => {
                setInput({
                    ...input,
                    images : [...images, res.data]
                })
            })
    }
    const handleRemoveImage = async (index)=>{
        await deleteImg(images[index])
            .then( response =>{
                if(response.data.message=== "Deleted"){
                    const newImages = [...images];
                    newImages.splice(index, 1);
                    setInput({
                        ...input,
                        images : newImages
                    })
                }
            })
            .catch(err => console.log(err))
    }
    const handlePDF = async (e)=>{
        const pdfFile = e.target.files[0]
        const pdfData = new FormData();
        pdfData.append('pdfFile', pdfFile);
        await uploadPDF(pdfData)
            .then(res =>
                setInput({
                    ...input,
                    pdf : [...pdf, `/${res.data}`]
                })
            )
            .catch(err => console.log(err))
    }
    const handleDeletePDF = async ()=>{
        let _pdf = pdf
        console.log(_pdf)
        const filename = _pdf[0].replace('/uploads/', '');
        console.log(filename)
        await deletePDF(filename)
            .then(()=>{
                setInput({
                    ...input,
                    pdf : ''
                })
            })
            .catch(err => console.log(err))

    }
    useEffect(()=>{
        setLoading(true)
        setMode('product')
        const fetchCategoryData = async ()=>{
            await readCategory()
                .then(response => setMainCategory(response.data))
                .catch(err => console.log(err.messages))
            await readAllSubcategory()
                .then(response => setSubCategory(response.data))
                .catch(err => console.log(err.messages))
            setLoading(false)
        }
        fetchCategoryData()
    }, [])
    useEffect(()=>{
        if(state && mainCategory && subCategory){
            const fetchData = async ()=>{
                await findOneProduct({ _id : state })
                    .then(response => {
                        setCheckedCategory(response.data.category)
                        setInput(response.data)
                    })
                    .catch(err => console.log(err.messages))
            }
            fetchData()
        }
    },[state, loading])
    useEffect(()=>{
        if(checkedCategory){
            const filter = subCategory.filter(sub => 
                sub.category === checkedCategory
            )
            setFilteredSub(filter)
        }
    },[checkedCategory])

    const createProductBtn = ()=>{
        if(!nameEng || !name || !category || !category_2 || !content || !contentEng){
            return alert('필수 정보들을 모두 입력해주세요')
        }
        createProduct({
            nameEng,
            name,
            category,
            category_2,
            content,
            contentEng,
            pdf,
            images
        })
            .then(response =>{
                console.log(response.data)
                if(response.data.message === "Success"){
                    alert('상품 등록이 완료되었습니다.')
                    navigate('/admin/product')
                }
            })
            .catch(err => alert(err.message.message))
    }
    const updateProductBtn = ()=>{
        if(!nameEng || !name || !category || !category_2 || !content || !contentEng){
            return alert('필수 정보들을 모두 입력해주세요')
        }
        
        updateProduct({
            _id,
            nameEng,
            name,
            category,
            category_2,
            content,
            contentEng,
            pdf,
            images
        })
        .then(response =>{
            if(response.data.message === "Success"){
                alert('상품 수정이 완료되었습니다.')
                navigate('/admin/product')
            }
        })
        .catch(err => alert(err.message.message))
    }
    
    return(
        <>
            {
                loading
                ? <p>Loading</p>
                :         <div className='ProductEditor'>
                <div className="Wrap">
                    <div className="labelInput">
                        <label className="EditorLabel" htmlFor="name">한글명</label>
                        <input className="EditorInput" type="text" value={ name } id="name" name="name" onChange={ handleInput }/>
                    </div>
                    <div className="labelInput">
                        <label className="EditorLabel" htmlFor="nameEng">영문명</label>
                        <input className="EditorInput" type="text" value={ nameEng } id="nameEng" name="nameEng" onChange={ handleInput }/>
                    </div>
                    <div className="labelInput">
                        <label className="EditorLabel" htmlFor="category">카테고리 대분류</label>
                        <select name="category" id="category" value={ category } onChange={(e)=>{
                            setCheckedCategory(e.target.value)
                            handleInput(e)
                        }}>
                            <option value=''>상위 카테고리</option>
                            {
                                mainCategory.map((category, index)=>
                                    <option key={ index } value={ category.category }>{ category.category }</option>
                                )
                            }
                        </select>
                    </div>
                    <div className="labelInput">
                        <label className="EditorLabel" htmlFor="category_2">카테고리 소분류</label>
                        {
                            !checkedCategory
                            ? <select name="category_2" id="category_2" value={ category_2 } onChange={ handleInput }>
                                <option value=''>상위 카테고리를 선택해주세요.</option>
                                {/* {
                                    subCategory.map((category, index)=>
                                        <option key={ index } value={ category.subcategory }>{ category.subcategory }</option>
                                    )
                                } */}
                            </select>
                            : <select name="category_2" id="category_2" value={ category_2 } onChange={ handleInput }>
                            <option value=''>하위 카테고리를 선택해주세요.</option>
                            {
                                filteredSub.map((category, index)=>
                                    <option key={ index } value={ category.subcategory }>{ category.subcategory }</option>
                                )
                            }
                        </select>
                        }
                    </div>

                    <div className="labelInput">
                        <label className="EditorLabel" htmlFor="content">한글 내용</label>
                        <textarea name="content" id="content" cols="30" rows="10" value={ content } onChange={ handleInput }></textarea>
                    </div>
                    <div className="labelInput">
                        <label className="EditorLabel" htmlFor="contentEng">영문 내용</label>
                        <textarea name="contentEng" id="contentEng" cols="30" rows="10" value={ contentEng } onChange={ handleInput }></textarea>
                    </div>
                    <div className="labelInput">
                        <p className="EditorLabel">PDF</p>
                        <label className="EditorLabel uploadPDF" htmlFor="pdf">파일 업로드</label>
                        <input className="PDFInput" type="file" accept=".pdf" id="pdf" onChange={ handlePDF } />
                        <div className="PDFDeleteWrap">
                            <p>{ pdf }</p>
                            {
                                !pdf
                                ? null
                                : <button className="deletePDF" onClick={ handleDeletePDF }>X</button>
                            }
                        </div>
                    </div>
                    <h3 className="EditorLabel">이미지</h3>
                    <div className="ImgLists">
                        {
                            images.map((image, index)=>
                                <div className="ImgWrap" key={ index } onClick={ ()=>{ handleRemoveImage(index) } }>
                                    <img src={`${ testUrl }/${ image }`} alt="" />
                                </div>
                            )
                        }
                        {
                            images.length === 5
                            ? null
                            : <>
                                <label htmlFor="file" className="ImgWrap">
                                    <div className="btn-upload">+</div>
                                </label>
                                <input type="file" id="file" className="Hide" onChange={ handleImage } />
                            </>
                        }
                        
                    </div>
                    {
                        !state
                        ? <button className="ProductEditorBtn" onClick={ createProductBtn }>제품 등록</button>
                        : <button className="ProductEditorBtn" onClick={ updateProductBtn }>제품 수정</button>
                    } 
                </div>
            </div>
            }
        </>
    )
}

export default ProductEditor