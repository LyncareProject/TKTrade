import { useEffect, useState } from "react"
import { useLocation } from 'react-router-dom';
import {  readCategory, readAllSubcategory } from "../../service/categoryService"
import './ProductList.css'
import { findAllProduct } from "../../service/productService"
import testUrl from "../../service/testURL"

const ProductList = ()=>{
    const { state } = useLocation();
    const [ loading, setLoading ] = useState(true)
    const [ mainCategory, setMainCategory ] = useState([])
    const [ subCategory, setSubCategory ] = useState([])
    const [ products, setProducts ] = useState([])
    console.log(products)
    const [ filteredSub, setFilteredSub ] = useState([])
    const [ filteredData, setFilteredData ] = useState([])

    const [ checkedCategory, setCheckedCategory ] = useState('')
    const [ checkedSubcategory, setCheckedSubcategory ] = useState('')
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
    const fetchAllProducts = async () => {
        await findAllProduct()
            .then(response => setProducts(response.data))
            .catch(err => console.log(err.messages))
    }
    const handleChecked = ( name )=>{
        setCheckedCategory(name)
        setCheckedSubcategory('')
    }

    useEffect(()=>{
        setLoading(true)
        fetchMainCategory()
        fetchAllSubCategory()
        fetchAllProducts()
        setLoading(false)
    }, [])
    useEffect(()=>{
        if(products && state){
            setCheckedCategory(state)
            const filter = products.filter(product =>
                product.category === checkedCategory
            )
            setFilteredData(filter)
        }
    }, [products, state])
    useEffect(()=>{
        if(checkedCategory && !checkedSubcategory){
            const filter = products.filter(product =>
                product.category === checkedCategory
            )
            return setFilteredData(filter)
        }
        if(checkedCategory && checkedSubcategory){
            const filter = products.filter(product =>
                product.category_2 === checkedSubcategory
            )
            return setFilteredData(filter)
        }
    }, [checkedCategory, checkedSubcategory])

    const openSubMenu = ( name )=>{
        if(checkedCategory === name){
            const filter = subCategory.filter(sub => 
                sub.category === checkedCategory
            )
            return (
                <>
                {
                    filter.map((a, index)=>
                        <div key={ index } className={
                            a.subcategory === checkedSubcategory
                            ? "subCategory subCategoryActive"
                            : "subCategory"
                        } onClick={()=>{
                            setCheckedSubcategory(a.subcategory)
                        }}>
                            <p>{ a.subcategory }</p>
                        </div>
                    )
                }
                </>
            )
        }
    }
    return(
        <div className='ProductList'>
            <div className="Wrap">
                <div className="ControlBar">
                    <div className="ControlTitle">PRODUCTS</div>
                    <div className="Category" onClick={()=>{
                        setCheckedCategory('')
                        setCheckedSubcategory('')
                    }}>전체</div>
                    {
                        mainCategory.map((a, i)=>
                            <div key={ i }>
                                <div className={
                                    a.category === checkedCategory
                                    ? "Category CategoryActive"
                                    : "Category"
                                } onClick={()=>{
                                    handleChecked(a.category)
                                }}>{a.category}</div>
                                { openSubMenu(a.category) }
                            </div>
                        )
                    }
                </div>
                <div className="Products">
                    {
                        loading
                        ? null
                        :
                        <div className="ProductsWrap">
                            {
                                !checkedCategory
                                ? <>
                                    {
                                        products.map((a, i)=>
                                            <a href={`/product/${ a._id }`} className="Product" key={ i }>
                                                <div className="ProductImgWrap">
                                                    <img src={`${ testUrl }/${ a.images[0] }`} alt="" />
                                                </div>
                                                <div className="ProductContentsWrap">
                                                    <p className="ProductName">{a.name}</p>
                                                    <p className="ProductName">{a.nameEng}</p>
                                                </div>
                                            </a>
                                        )
                                    }
                                </>
                                : <>
                                {
                                    filteredData.map((a, i)=>
                                        <a href={`/product/${ a._id }`} className="Product">
                                            <div className="ProductImgWrap">
                                                <img src={`${ testUrl }/${ a.images[0] }`} alt="" />
                                            </div>
                                            <div className="ProductContentsWrap">
                                                <p className="ProductName">{a.name}</p>
                                                <p className="ProductName">{a.nameEng}</p>
                                            </div>
                                        </a>
                                    )
                                }
                            </>
                            }
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default ProductList