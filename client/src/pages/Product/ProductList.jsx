import { useEffect, useState } from "react"
import {  readCategory, readAllSubcategory } from "../../service/categoryService"
import './ProductList.css';
import { findAllProduct } from "../../service/productService"
import testUrl from "../../service/testURL"
import Card from "../../components/Card/Card";
import {useLocation} from "react-router-dom";

const ProductList = ()=>{
    const {state} = useLocation();
    console.log(state);
    const [ loading, setLoading ] = useState(true)
    const [ mainCategory, setMainCategory ] = useState([])
    const [ products, setProducts ] = useState([])
    const [ filteredData, setFilteredData ] = useState([])
    const [ checkedCategory, setCheckedCategory ] = useState('')

    const fetchMainCategory = async ()=>{
        await readCategory()
            .then(response => setMainCategory(response.data))
            .catch(err => console.log(err.messages))
    }

    const fetchAllProducts = async () => {
        await findAllProduct()
            .then(response => setProducts(response.data))
            .catch(err => console.log(err.messages))
    }

    const handleChecked = ( name )=>{
        setCheckedCategory(name)
    }

    useEffect(()=>{
        setLoading(true)
        fetchMainCategory()
        fetchAllProducts()
        setLoading(false)
    }, [])

    useEffect(()=>{
        if(checkedCategory){
            const filter = products.filter(product =>
                product.category === checkedCategory
            )
            return setFilteredData(filter)
        }
        if(checkedCategory){
            const filter = products.filter(product =>
                product.category === checkedCategory
            )
            return setFilteredData(filter)
        }
    }, [checkedCategory])

    return(
        <div className='ProductList'>
            <div className={
                !checkedCategory
                ? null
                : 'Wrap'}>
                <div className={
                    checkedCategory
                    ? "ControlBar"
                    : "ControlBarNone"}>
                    <div className="ControlTitle" >PRODUCTS</div>
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
                                    <div className='CategoryProductWrap'>
                                        {

                                        mainCategory.map((a, index)=>
                                    
                                        <div className='CategoryList1' key={ index } onClick={()=>{
                                            handleChecked(a.category)
                                        }}>
                                            <div className='CardImgWrap'>
                                                <img src='http://tk-trade.co.kr/uploads/BKK TYPE-1697442535837.png' alt="" />
                                            </div>
                                            {a.category}</div>

                                            )
                                        }
                                    </div>
                                </>
                                : <>
                                {
                                    filteredData.map((product, index)=>
                                        <div className='CardWrap' key={ index }>
                                            <Card product={ product }/>
                                        </div>
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