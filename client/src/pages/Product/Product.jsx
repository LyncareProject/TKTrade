import './Product.css'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { findOneProduct } from '../../service/productService'
import testUrl from '../../service/testURL.js'

const Product = ()=>{
    const { id } = useParams()
    const [ product, setProduct ] = useState()
    const [ mainImage, setMainImage ] = useState()
    useEffect(()=>{
        findOneProduct({ _id : id })
            .then(response => {
                setProduct(response.data)
                setMainImage(response.data.images[0])
            })
    },[id])

    return(
        <div className='Product'>
            { 
                !product
                ? null
                : <div className='Wrap Container'>
                    <div className='Left'>
                        <div className='ProductImgWrap'>
                            <img src={`${ testUrl }/${ mainImage }`} alt="ProductImg"/>
                        </div>
                        <div className='ImgControllerWrap'>
                            {
                                product.images.map((image, index)=>{
                                    return <div className='ImgController' key={ index }>
                                            <img src={`${ testUrl }/${ image }`} alt="ImgController" onClick={()=>{
                                                setMainImage(image)
                                            }}/>
                                        </div>
                                })
                            }
                        </div>
                    </div>
                    <div className='Right'>
                        <h3 className='ProductName'>{ product.name }</h3>
                        <h3 className='ProductName'>{ product.nameEng }</h3>
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