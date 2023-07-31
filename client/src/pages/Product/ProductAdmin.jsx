import { useEffect, useState } from "react"
import { deleteProduct, findAllProduct } from "../../service/productService"
import './ProductAdmin.css'
import { useNavigate } from "react-router-dom"

const ProductAdmin = ({ setMode })=>{
    const navigate = useNavigate()
    const [ loading, setLoading ] = useState(false)
    const [ products, setProducts ] = useState([])

    const fetchAllProducts = async () => {
        await findAllProduct()
            .then(response => setProducts(response.data))
            .catch(err => console.log(err.messages))
    }

    useEffect(()=>{
        setMode("product")
    },[])
    useEffect(()=>{
        fetchAllProducts()
    }, [loading])

    const deleteBtn = async ( id )=>{
        if (window.confirm("해당 상품을 삭제하시겠습니까?")) {
            setLoading(true)
            await deleteProduct({ _id : id })
                .then(response => {
                    if(response.data.message === "Success"){
                        alert('상품 삭제가 완료되었습니다.')
                        setLoading(false)
                    }
                })
                .catch(err => alert(err.message))
        } else {
            alert("취소되었습니다.");
        }
    }
    
    return(
        <div className="ProductAdmin">
            <div className="ProductsWrap">
                {
                    products.map((product, index)=>
                        <div className="Product" key={ index }>
                            <p>{ product.name }</p>
                            <div className="ProductBtn">
                                <button onClick={()=>{
                                    navigate('/admin/editor', { state : product._id })
                                }}>수정</button>
                                <button onClick={ ()=>{
                                    deleteBtn(product._id)
                                }}>삭제</button>
                            </div>
                        </div>
                    )
                }
            </div>
            <a href="/admin/editor" className="CreateBtn">제품 등록</a>
        </div>
    )
}
export default ProductAdmin