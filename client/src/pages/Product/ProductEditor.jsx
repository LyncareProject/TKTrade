import { useEffect, useState } from "react"
import './ProductEditor.css'
import { readAllSubcategory, readCategory } from "../../service/categoryService";
import { createProduct, findOneProduct, updateProduct } from "../../service/productService";
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { uploadImg } from "../../service/uploadService";

const ProductEditor = ({ setMode })=>{
    const { state } = useLocation();
    const navigate = useNavigate()

    const [ mainCategory, setMainCategory ] = useState([])
    const [ subCategory, setSubCategory ] = useState([])
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
    const { _id, nameEng, name, category, category_2, content, contentEng, pdf, images } = input

    const handleInput = (e)=>{
        setInput({
            ...input,
            [ e.target.name ] : e.target.value
        })
    }
    const handleImageChange = (e) => {
        const files = e.target.files;
        const imagesArray = Array.from(files).map((file) => URL.createObjectURL(file));
        console.log(files)
        uploadImg({ formData : files })
        // const files = e.target.files;
        // const imagesArray = Array.from(files).map((file) => URL.createObjectURL(file));
        // setInput({
        //     ...input,
        //     images : [...images, ...imagesArray]
        // });

    };
    const handleImageRemove = (index) => {
        const newImages = [...images];
        newImages.splice(index, 1);
        setInput({
            ...input,
            images : newImages
        });
    };
    console.log(input)
    const fetchMainCategory = async ()=>{
        await readCategory()
            .then(response => setMainCategory(response.data))
            .catch(err => console.log(err.messages))
    }
    const fetchAllSubCategory = async () => {
        await readAllSubcategory()
            .then(response => setSubCategory(response.data))
            .catch(err => console.log(err.messages))
    }

    useEffect(()=>{
        setMode('product')
        fetchMainCategory()
        fetchAllSubCategory()
        if(state){
            findOneProduct({ _id : state })
                .then(response => {
                    setCheckedCategory(response.data.category)
                    setInput(response.data)
                })
                .catch(err => console.log(err.messages))
        }

    }, [])

    useEffect(()=>{
        if(checkedCategory){
            const filter = subCategory.filter(sub => 
                sub.category === checkedCategory
            )
            return setFilteredSub(filter)
        }
    }, [checkedCategory])

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
        <div className='ProductEditor'>
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
                            mainCategory.map((a, i)=>
                                <option key={ i } value={ a.category }>{ a.category }</option>
                            )
                        }
                    </select>
                </div>
                <div className="labelInput">
                    <label className="EditorLabel" htmlFor="category_2">카테고리 소분류</label>
                    <select name="category_2" id="category_2" value={ category_2 } onChange={ handleInput }>
                        {
                            !checkedCategory
                            ? <>
                                <option value=''>상위 카테고리를 선택해주세요.</option>
                                {
                                    subCategory.map((a, i)=>
                                        <option key={ i } value={ a.subcategory }>{ a.subcategory }</option>
                                    )
                                }
                            </>
                            : <>
                                <option value=''>하위 카테고리를 선택해주세요.</option>
                                {
                                    filteredSub.map((a, i)=>
                                        <option key={ i } value={ a.subcategory }>{ a.subcategory }</option>
                                    )
                                }
                            </>
                        }
                    </select>
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
                    <label className="EditorLabel" htmlFor="pdf">PDF 링크</label>
                    <input className="EditorInput" type="text" value={ pdf } id="pdf" name="pdf" onChange={ handleInput }/>
                </div>
                <input type="file" name="images" multiple onChange={ handleImageChange } />
                <div>
                    {
                        images.map((image, index) => (
                            <div key={index} onClick={() => handleImageRemove(index)}>
                                <img src={image} alt={`Image ${index}`} onClick={() => handleImageRemove(index)}/>
                            </div>
                        ))
                    }
                </div>
                {
                    !state
                    ? <button className="ProductEditorBtn" onClick={ createProductBtn }>제품 등록</button>
                    : <button className="ProductEditorBtn" onClick={ updateProductBtn }>제품 수정</button>
                } 
            </div>
        </div>
    )
}

export default ProductEditor