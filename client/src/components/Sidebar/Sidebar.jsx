import './Sidebar.css'
import Logo from '../../assets/images/Logo.png'
import { useEffect, useState } from "react"
import {  readCategory, readAllSubcategory } from "../../service/categoryService"
import { findAllProduct } from "../../service/productService"

const Sidebar = ({
    sidebar,
    setSidebar
})=>{
    const handleSidebar = ()=>{
        setSidebar(false)
    }
    const [ loading, setLoading ] = useState(true)
    const [ mainCategory, setMainCategory ] = useState([])
    const [ subCategory, setSubCategory ] = useState([])
    const [ products, setProducts ] = useState([])
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
        if(checkedCategory && !checkedSubcategory){
            const filter = products.filter(product =>
                product.category === checkedCategory
            )
            return setFilteredData(filter)
        }
        if(checkedCategory && checkedSubcategory){
            const filter = products.filter(product =>
                product.category === checkedCategory && product.category_2 === checkedSubcategory
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
        <div> 
            <div className={
                    !sidebar
                    ? "Sidebar Closed"
                    : "Sidebar Open"
                }>
                <a href="/">
                    <img src={ Logo } alt="Logo" className='MobileLogo'/>
                </a>
                {
                    // Menu.map((a, i)=>
                    //     <a href={ a.href } className='MobileMenu' key={ i }>
                    //         <FontAwesomeIcon className='MobileIcon' icon={ a.icon } />
                    //         { a.name }
                    //     </a>
                    
                }
                {/* <a href="/" className='MobileMenu'>HOME</a>
                <a href="/" className='MobileMenu'>PRODUCTS</a>
                <a href="/" className='MobileMenu'>CUSTOMER</a>
                <a href="/" className='MobileMenu'>COMPANY</a>
                <a href="/" className='MobileMenu'>PRODUCT INQUIRIES</a> */}
                {/* <button onClick={ handleSidebar }>X</button> */}
                <div className='SideProductList'>
                    <div className="Wrap">             
                        <div className="ControlBar">
                            <div className="ControlTitle" >PRODUCTS</div>
                                <div className="Category" onClick={()=>{
                                    setCheckedCategory('')
                                    setCheckedSubcategory('')
                                }}>ALL</div>
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
                </div> 
            </div>
        </div>
            {
                !sidebar
                ? null
                : <div onClick={ handleSidebar } className="SidebarOut"></div>
            }
        </div>
    )
}
export default Sidebar