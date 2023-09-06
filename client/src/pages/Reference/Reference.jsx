import { useEffect, useState } from "react"
import { findAllProduct } from "../../service/productService"
import './Reference.css'
import { requestCatalog } from "../../service/emailService"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faPaperPlane } from '@fortawesome/free-solid-svg-icons'

const Reference = ({ setSending })=>{
    const [ data, setData ] = useState()
    const [ modal, setModal ] = useState(false)
    const [ selected, setSelected ] = useState('')

    useEffect(()=>{
        const fetchData = async ()=>{
            await findAllProduct()
                .then(response => setData(response.data))
                .catch(err => console.log(err.messages))
        }
        fetchData()
    },[])

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
                                <div className="PDFList" onClick={()=>{
                                    setModal(true)
                                    setSelected(item.nameEng)
                                }}>                        
                                    <p>{ item.nameEng }</p>
                                </div>
                            )
                        }
                    </div>
                </div>
            }
            {
                modal
                ? <Modal selected = { selected } setModal={ setModal } setSending={ setSending }/>
                : null
            }
        </div>
    )
}
const Modal = ({ selected, setModal, setSending })=>{
    const [ email, setEmail ] = useState('')

    const sendEmail = async ()=>{
        const emailRegEx = /^[A-Za-z0-9]([-_.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/i;
        if(!emailRegEx.test(email)){
            return alert("Check your email format")
        }
        setSending(true)
        await requestCatalog({ email, product : selected })
            .then(()=>{
                setSending(false)
                alert('Complete')
                setModal(false)
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
    return(
        <div className="Modal">
            <div className="ModalOutside" onClick={()=>{
                setModal(false)
            }}></div>
            <div className="ModalInputWrap">
                <button className="ClosedBtn" onClick={()=>{
                    setModal(false)
                }}>X</button>
                <h2>Request Catalog by Email</h2>
                <h3>Product : { selected }</h3>
                <div className="InputWrap">
                    <input 
                        type="text" 
                        placeholder="Please write your Email" 
                        onChange={(e)=>setEmail(e.target.value)} 
                        onKeyDown={ handleKeyPress }
                    />
                    <FontAwesomeIcon className='PaperPlane' icon={ faPaperPlane } onClick={ sendEmail }/>
                </div>
            </div>
        </div>
    )
}
export default Reference