import './Product.css'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { findOneProduct } from '../../service/productService'
import testUrl from '../../service/testURL.js'
import { requestCatalog } from '../../service/emailService'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faPaperPlane } from '@fortawesome/free-solid-svg-icons'

const Product = ({ setSending })=>{
    const { id } = useParams()
    const [ product, setProduct ] = useState(null)
    const [ status, setStatus ] = useState(1)
    const [ email, setEmail ] = useState('')
    const [ mainImage, setMainImage ] = useState()
    const sendEmail = async ()=>{
        const emailRegEx = /^[A-Za-z0-9]([-_.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/i;
        if(!emailRegEx.test(email)){
            return alert("Check your email format")
        }
        setSending(true)
        await requestCatalog({ email, product : product.nameEng })
            .then(()=>{
                setSending(false)
                setStatus(3)
            })
            .catch( err =>{
                setSending(false)
                alert(`ERR : ${ err.message }`)
            })
    }
    const handleKeyPress = (e)=>{
        if (e.key === 'Enter') {
            sendEmail()
        }
    }

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
                        {/* <h3 className='ProductName'>{ product.name }</h3> */}
                        <h3 className='ProductName'>{ product.nameEng }</h3>
                        {/* <p className='ProductContent'>{ product.content }</p> */}
                        <p className='ProductContent'>{ product.contentEng }</p>
                        {
                            !product.pdf
                            ? null
                            : <a className='ProductPDF' href={ product.pdf }>Catalogue PDF</a>
                        }
                        {
                            status === 1
                            ? <div className='RequestWrap' onClick={ ()=> setStatus(2) }>
                                <p>Request Catalog</p>
                            </div>
                            : null
                        }
                        {
                            status === 2
                            ? <div className='RequestInputWrap'>
                                <input type="email" placeholder='Your Email' value={ email } onChange={(e)=>{ setEmail(e.target.value) }} onKeyDown={ handleKeyPress } />   
                                <FontAwesomeIcon className='PaperPlane' icon={ faPaperPlane } onClick={ sendEmail }/>
                            </div>
                            : null
                        }
                        {
                            status === 3
                            ? <div className='RequestWrap'>
                                <p>Request Complete <FontAwesomeIcon icon={ faCheck } /></p>
                            </div>
                            : null
                        }
                    
                    </div>

                </div>
            }
        </div>
    )
}

export default Product