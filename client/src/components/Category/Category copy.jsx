import { useEffect, useState } from "react";
import { createCategory, createSubcategory, deleteCategory, deleteSubcategory, readCategory, readSubcategory } from "../../service/categoryService";
import './Category.css'

const Category = ()=>{

    const [ maincategory, setMaincategory ] = useState([])
    const [ subcategory, setSubcategory ] = useState([])
    
    const [ checkCategory, setCheckCategory ] = useState('')

    const [ input, setInput ] = useState({
        categoryName : '',
        subcategoryName : ''
    })

    const { categoryName, subcategoryName } = input

    const handleInput = (e)=>{
        setInput({
            ...input,
            [ e.target.name ] : e.target.value
        })
    }

    const deleteCategoryBtn = (id)=>{
        deleteCategory({ category : id })
    }

    const createCategoryBtn = ()=>{
        createCategory({ category : categoryName })
    }

    useEffect(()=>{
        const fetchData = async ()=>{
            readCategory({ category : checkCategory })
                .then(response=>{
                    setMaincategory(response.data)
                })
                .catch(err => console.log(err.message))
        }
        fetchData()
    },[ deleteCategoryBtn, createCategoryBtn ])


    const createSubcategoryBtn = ()=>{
        createSubcategory({ 
            category : checkCategory, 
            subcategory : subcategoryName 
        })
    }

    const deleteSubcategoryBtn = (id)=>{
        deleteSubcategory({ category : checkCategory, subcategory : id })
    }


    useEffect(()=>{        
        readSubcategory({ category : checkCategory })
        .then(response=>{
            setSubcategory(response.data)
        })
        .catch(err => console.log(err.message))
    }, [checkCategory, createSubcategoryBtn, deleteSubcategoryBtn])

    return(
        <div className="Category">
            <div className="Wrap">
                <div>
                    <h3>카테고리 대분류</h3>
                    <MainCategory maincategory={ maincategory } setCheckCategory={ setCheckCategory } deleteCategoryBtn={ deleteCategoryBtn } />
                    <div className="CategoryInputWrap">
                        <input placeholder="카테고리 명을 입력하세요" type="text" name="categoryName" onChange={ handleInput }/>
                        <button onClick={ createCategoryBtn }>+</button>
                    </div>
                </div>
                <div>
                    <h3>카테고리 소분류</h3>
                    <div className="CategoryWrap">
                        {
                            !checkCategory
                            ? <p>메인 카테고리를 클릭하세요</p>
                            : <SubCategory subcategory={ subcategory } deleteSubcategoryBtn = { deleteSubcategoryBtn }/>
                        }
                    </div>
                    <div>
                        {
                            !checkCategory
                            ? null
                            : <div className="CategoryInputWrap">
                                <input placeholder="카테고리 명을 입력하세요" type="text" name="subcategoryName" onChange={ handleInput }/>
                                <button onClick={ createSubcategoryBtn }>+</button>
                            </div>
                        }
                    </div>
                </div>
            </div>     
        </div>
    )
}

const MainCategory = ({ maincategory, setCheckCategory, deleteCategoryBtn })=>{
    return(
        <div className="CategoryWrap">
            {
                !maincategory
                ? <p>Noting</p>
                : maincategory.map((a, i)=>
                    <div className="CategoryList" key={ i } onClick={()=>{
                        setCheckCategory(a.category)
                    }}>
                        <p>{ a.category }</p>
                        <button onClick={()=>{
                            deleteCategoryBtn(a.category)
                        }}>삭제</button>
                    </div>
                )
            }
        </div>
    )
}
const SubCategory = ({ subcategory, deleteSubcategoryBtn })=>{
    return(
        <>
            {
                subcategory.map((a, i)=>
                    <div className="CategoryList" key={ i }>
                        <p>{ a.subcategory }</p>
                        <button onClick={ ()=>{
                            deleteSubcategoryBtn(a.subcategory)
                        } }>삭제</button>
                    </div>
                )
            }
        </>
    )
}
export default Category;