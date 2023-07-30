import { useEffect, useState } from "react"
import {  readCategory, readAllSubcategory } from "../../service/categoryService"
import './ProductList.css'
import { findAllProduct } from "../../service/productService"

const ProductList = ()=>{
    const [ loading, setLoading ] =  useState(false)
    const [ mainCategory, setMainCategory ] = useState([])
    const [ subCategory, setSubCategory ] = useState([])
    const [ products, setProducts ] = useState([])
    const [ filteredData, setFilteredData ] = useState([])

    const [ checkedCategory, setCheckedCategory ] = useState('')
    const fatchMainCategory = async ()=>{
        await readCategory()
            .then(response => setMainCategory(response.data))
            .catch(err => console.log(err.messages))
    }
    const fatchAllSubCategory = async () => {
        await readAllSubcategory()
            .then(response => setSubCategory(response.data))
            .catch(err => console.log(err.messages))
    }
    const fatchAllProducts = async () => {
        await findAllProduct()
            .then(response => setProducts(response.data))
            .catch(err => console.log(err.messages))
    }
    const handleChecked = ( name )=>{
        setCheckedCategory(name)
    }
    useEffect(()=>{
        setLoading(true)
        fatchMainCategory()
        fatchAllSubCategory()
        fatchAllProducts()
        setLoading(false)
    }, [])

    useEffect(()=>{
        if(checkedCategory){
            const filter = products.filter(product =>
                product.category === checkedCategory
            )
            setFilteredData(filter)
        }
    }, [checkedCategory])
    // const openSubMenu = ( name )=>{
    //     fatchSubCategory(name)
    //     // console.log(subCategory)
    //     if(checkedCategory === name){
    //         return (
    //             <>
    //             checked
    //                 {/* {
    //                     subCategory.map((a, i)=>
    //                         <div className="Category" key={ i }>{a.category}</div>
    //                     )
    //                 } */}
    //             </>
    //         )
    //     }
    // }
    return(
        <div className='ProductList'>
            <div className="Wrap">
                <div className="ControlBar">
                    <p className="ControlTitle">카테고리</p>
                    {
                        mainCategory.map((a, i)=>
                            <div key={ i }>
                                <div className="Category" onClick={()=>{
                                    handleChecked(a.category)
                                }}>{a.category}</div>
                                {/* { openSubMenu(a.category) } */}
                            </div>
                        )
                    }
                </div>
                <div>
                    {
                        !checkedCategory
                        ? <>
                            {
                                products.map((a, i)=>
                                    <>
                                        <p>{a.name}</p>
                                    </>
                                )
                            }
                        </>
                        : <>
                        {
                            filteredData.map((a, i)=>
                                <>
                                    <p>{a.name}</p>
                                </>
                            )
                        }
                    </>
                    }

                </div>
            </div>
        </div>
    )
}

export default ProductList