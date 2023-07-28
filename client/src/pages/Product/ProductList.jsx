import { useEffect, useState } from "react"
import { createCategory, createSubcategory, deleteCategory, deleteSubcategory, readCategory, readSubcategory } from "../../service/categoryService"
import './ProductList.css'

const ProductList = ()=>{
    const [ mainCategory, setMainCategory ] = useState([])
    const fatchMainCategory = async ()=>{
        await readCategory()
            .then(response => setMainCategory(response.data))
            .catch(err => console.log(err.messages))
    }
    useEffect(()=>{
        fatchMainCategory()
    }, [])

    return(
        <div className='ProductList'>
            <div className="Wrap">
                <div>
                    <p>카테고리</p>
                    {
                        mainCategory.map((a, i)=>
                            <div>{a.category}</div>
                        )
                    }
                </div>
                <div></div>
            </div>
        </div>
    )
}

export default ProductList