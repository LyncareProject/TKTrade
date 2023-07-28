import { useEffect, useState } from "react";
import { createCategory, createSubcategory, deleteCategory, deleteSubcategory, readCategory, readSubcategory } from "../../service/categoryService";
import './Category.css'

const Category = ()=>{
    const [ loading, setLoading ] = useState(false)
    const [ mainCategory, setMainCategory ] = useState([])
    const [ subCategory, setSubCategory ] = useState([])

    const [ input, setInput ] = useState({
        mainCategoryName : '',
        subCategoryName : ''
    })
    const { mainCategoryName, subCategoryName } = input

    const handleInput = (e)=>{
        setInput({
            ...input,
            [ e.target.name ] : e.target.value
        })
    }

    const [ checkCategory, setCheckCategory ] = useState('')

    const createCategoryBtn = ()=>{
        setLoading(true)
        createCategory({ category : mainCategoryName })
            .then(()=>{
                setLoading(false)
            })
    }

    useEffect(()=>{
        readCategory()
            .then(response=> setMainCategory(response.data))
            .catch(err => console.log(err.message))
    
    },[loading])

    const deleteSubCategoryBtn = (id)=>{
        deleteSubcategory({ category : checkCategory, subcategory : id })
    }

    useEffect(()=>{
        if(checkCategory){
            readSubcategory({ category: checkCategory })
                .then(response=> setSubCategory(response.data))
                .catch(err => console.log(err.message))
        }
    }, [checkCategory])

    return(
        <div className="Category">
            <div className="Wrap">
                <div>
                    <h3>카테고리 대분류</h3>
                    <div className="CategoryWrap">
                        {
                            !mainCategory
                            ? <p>Noting</p>
                            : mainCategory.map((a, i)=>
                                <div className="CategoryList" key={ i } onClick={()=>{
                                    setCheckCategory(a.category)
                                }}>
                                    <p>{ a.category }</p>
                                    {/* <button onClick={()=>{
                                        deleteCategoryBtn(a.category)
                                    }}>삭제</button> */}
                                </div>
                            )
                        }
                    </div>
                    <div className="CategoryInputWrap">
                        <input placeholder="카테고리 명을 입력하세요" type="text" name="mainCategoryName" onChange={ handleInput }/>
                        <button onClick={ createCategoryBtn }>+</button>
                    </div>
                </div>
                <div>
                    <h3>카테고리 소분류</h3>
                    <div className="CategoryWrap">
                        {
                            !subCategory
                            ? <p>Noting</p>
                            : subCategory.map((a, i)=>
                                <div className="CategoryList" key={ i }>
                                    <p>{ a.subcategory }</p>
                                    <button onClick={()=>{
                                        deleteSubCategoryBtn(a.category)
                                    }}>삭제</button>
                                </div>
                            )
                        }

                    </div>
                    <div>
                      
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Category;