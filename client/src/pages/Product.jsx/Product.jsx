import './Product.css'
import data from '../../Data'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'

const Product = ()=>{
    const { id } = useParams()
    const [ product, setProduct ] = useState()
    useEffect(()=>{
        setProduct(data[id])
    },[id])

    return(
        <div className='Product'>
            { 
                !product
                ? null
                : <>
                    <h3>{ product.name }</h3>
                    {
                        product.images.map((image, index)=>{
                            return <img src={`/images/${ image }`} alt="" />
                        })
                    }
                </>
            }
        </div>
    )
}

export default Product