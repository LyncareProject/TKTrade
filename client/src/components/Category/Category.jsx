import { useEffect, useState } from "react"
import { createCategory, createSubcategory, deleteCategory, deleteSubcategory, readCategory, readSubcategory } from "../../service/categoryService"
import './Category.css'

const Category = ()=>{
    const [ mainCategory, setMainCategory ] = useState([])
    const [ subCategory, setSubCategory ] = useState([])
    const [ checkedCategory, setCheckedCategory ] = useState('')
    const [ input, setInput ] = useState({
        mainCategoryName : "",
        subCategoryName : "",
    })
    const { mainCategoryName, subCategoryName } = input

    const fatchMainCategory = async ()=>{
        await readCategory()
            .then(response => setMainCategory(response.data))
            .catch(err => console.log(err.messages))
    }
    const fatchSubCategory = async ({ category }) => {
        await readSubcategory({ category })
            .then(response => setSubCategory(response.data))
            .catch(err => console.log(err.messages))
    }
    const handleChecked = ( name )=>{
        setCheckedCategory(name)
    }
    const handleInput = (e)=>{
        setInput({
            ...input,
            [ e.target.name ] : e.target.value
        })
    }
    const createMainCategory = async ()=>{
        await createCategory({ category : mainCategoryName }).then(()=>{
            fatchMainCategory()
        })
    }
    const createSubCategory = async ()=>{
        await createSubcategory({
            category : checkedCategory,
            subcategory : subCategoryName
        }).then(()=>{
            fatchSubCategory({ category : checkedCategory })
        })
    }
    const deleteMainCategory = async ( name )=>{
        if (window.confirm("상위 카테고리를 삭제하면 하위 카테고리 또한 삭제됩니다.")) {
            await deleteCategory({ category : name })
            .then(()=>{
                fatchMainCategory()
            }) 
        } else {
            alert("취소되었습니다.");
        }
    }

    const deleteSubCategory = async ( name )=>{
        if (window.confirm("하위 카테고리를 삭제하시겠습니까?")) {
            await deleteSubcategory({
                category : checkedCategory,
                subcategory : name
            }).then(()=>{
                fatchSubCategory({ category : checkedCategory })
            })
        } else {
            alert("취소되었습니다.");
        }
    }
    useEffect(()=>{
        fatchMainCategory()
    }, [])

    useEffect(()=>{
        fatchSubCategory({ category : checkedCategory })
    }, [checkedCategory])

    return(
        <div className='Category'>
            <div className="Wrap">
                <div>
                    <h3 className="CategoryTitle">상위 카테고리</h3>
                    <div className="CategoryWrap">
                        {
                            mainCategory.map((a, i)=>
                                <div className="CategoryList" onClick={()=>{
                                    handleChecked(a.category)
                                }} key={ i }>
                                    <p>{ a.category }</p>
                                    <button onClick={()=>{
                                        deleteMainCategory(a.category)
                                    }}>삭제</button>
                                </div>
                            )
                        }
                    </div>
                    <div className="CategoryInputWrap">
                        <input type="text" placeholder="상위 카테고리" name="mainCategoryName" onChange={ handleInput }/>
                        <button onClick={ createMainCategory }>+</button>
                    </div>
                </div>
                <div>
                    <h3 className="CategoryTitle">하위 카테고리</h3>
                    <div className="CategoryWrap">
                        {
                            !checkedCategory
                            ? <p>상위 카테고리를 선택해주세요</p>
                            : subCategory.map((a, i)=>
                                <div className="CategoryList" key={ i }>
                                    <p>{ a.subcategory }</p>
                                    <button onClick={()=>{
                                        deleteSubCategory(a.subcategory)
                                    }}>삭제</button>
                                </div>
                            )
                        }
                    </div>
                    {
                        !checkedCategory
                        ? null
                        : <div className="CategoryInputWrap">
                            <input type="text" placeholder="하위 카테고리" name="subCategoryName" onChange={ handleInput }/>
                            <button onClick={ createSubCategory }>+</button>
                        </div>
                        
                    }
                    
                </div>
            </div>
        </div>
    )
}

export default Category;