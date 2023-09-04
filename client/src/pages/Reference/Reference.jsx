import { useEffect, useState } from "react"
import { findAllProduct } from "../../service/productService"
import './Reference.css'
const Reference = ()=>{
    const [ data, setData ] = useState()
    useEffect(()=>{
        const fetchData = async ()=>{
            await findAllProduct()
                .then(response => setData(response.data))
                .catch(err => console.log(err.messages))
        }
        fetchData()
    },[])
    console.log(data)
    return(
        <div>
            {
                !data
                ? null
                : <div className="ReferenceWrap Wrap">
                    <div className="PDFListWrap">
                        <div className="PDFHead">
                            <p>Product Catalogue</p>
                        </div>
                        {
                            data.map((item, index)=>
                            <>
                                {               
                                    !item.pdf
                                    ? null
                                    :             
                                    <a href={ item.pdf } className="PDFList">                        
                                        <p>{ item.nameEng }</p>
                                    </a>
                                }
                            </>
                            )
                        }
                    </div>
                </div>
            }
        </div>
    )
}
export default Reference