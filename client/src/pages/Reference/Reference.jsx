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
                    <p>제품명</p>
                    {
                        data.map((item, index)=>
                            <a href={ item.pdf }>{ item.nameEng }</a>
                        )
                    }
                </div>
            }
        </div>
    )
}
export default Reference