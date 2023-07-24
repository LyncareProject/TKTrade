import './Product.css'
import data from '../../Data'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'

const Product = ()=>{
    const { id } = useParams()
    const [ product, setProduct ] = useState()
    const [ mainImage, setMainImage ] = useState()
    useEffect(()=>{
        setProduct(data[id])
        setMainImage(data[id].images[0])
    },[id])

    return(
        <div className='Product'>
            { 
                !product
                ? null
                : <div className='Wrap Container'>
                    <div className='Left'>
                        <div className='ProductImgWrap'>
                            <img src={`/images/${ mainImage }`} alt="ProductImg"/>
                        </div>
                        <div className='ImgControllerWrap'>
                            {
                                product.images.map((image, index)=>{
                                    return <div className='ImgController' key={ index }>
                                            <img src={`/images/${ image }`} alt="ImgController" onClick={()=>{
                                                setMainImage(image)
                                            }}/>
                                        </div>
                                })
                            }
                        </div>
                    </div>
                    <div className='Right'>
                        <h3 className='ProductName'>{ product.name }</h3>
                        <p className='ProductContent'>{ product.content }</p>
                        <p className='ProductContent'>{ product.contentEng }</p>
                        {
                            !product.pdf
                            ? null
                            : <a className='ProductPDF' href={ product.pdf }>Catalogue PDF</a>
                        }
                        
                    </div>

                </div>
            }
        </div>
    )
}

export default Product