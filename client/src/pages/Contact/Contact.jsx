import { useState } from 'react'
import './Contact.css'
import { postEmail } from '../../service/emailService'

const Contact = ({ setSending })=>{
    const [ inputs, setInputs ] = useState({
        FirstName : '',
        LastName : '',
        Email : '',
        Company : '',
        Phone : '',
        TextArea : ''
    })
    const { FirstName, LastName, Email, Company, Phone, TextArea } = inputs
    const handleInput = (e)=>{
        setInputs({
            ...inputs,
            [ e.target.name ] : e.target.value
        })
    }
    const sendBtn = async ()=>{
        if(!FirstName || !Email) {
            return alert('please write everything')
        }
        setSending(true)
        await postEmail({
            name : FirstName + LastName,
            company : Company,
            phone : Phone,
            email : Email,
            products : TextArea
        }).then(response => {
            if(response.data.message === 'Success'){
                alert('Complete')
                setInputs({
                    FirstName : '',
                    LastName : '',
                    Email : '',
                    Company : '',
                    Phone : '',
                    TextArea : ''
                })
            }
            setSending(false)
        })
    }
    return(
        <div className="Contact Wrap">
            <div className='ContactDivision'>
                <div className="ContactInputWrap">
                    <h3 className='ContactInputTitle'>Name <span className="Red">*</span></h3>
                    <div className='ContactInputSubWrap'>
                        <input className='ContactInputDivision' name='FirstName' type="text" placeholder="First Name" onChange={ handleInput } value={ FirstName } />
                        <input className='ContactInputDivision' name='LastName' type="text" placeholder="Last Name" onChange={ handleInput } value={ LastName } />
                    </div>
                </div>
                <div className="ContactInputWrap">
                    <h3 className='ContactInputTitle'>Email <span className="Red">*</span></h3>
                    <input className='ContactInput' type="text" name='Email' placeholder="Email" onChange={ handleInput } value={ Email } />
                </div>
                <div className="ContactInputWrap">
                    <h3 className='ContactInputTitle'>Company</h3>
                    <input className='ContactInput' type="text" name='Company' placeholder="Company" onChange={ handleInput } value={ Company } />
                </div>
                <div className="ContactInputWrap">
                    <h3 className='ContactInputTitle'>Phone</h3>
                    <input className='ContactInput' type="text" name='Phone' placeholder="Phone" onChange={ handleInput } value={ Phone } />
                </div>
                <div className="ContactInputWrap">
                    <h3 className='ContactInputTitle'>Text Area (Products of Interest)</h3>
                    <textarea className='ContactTextArea' name="TextArea" id="" cols="30" rows="10" placeholder="Text Area" onChange={ handleInput } value={ TextArea } ></textarea>
                </div>
                <button className='SendBtn' onClick={ sendBtn }>Send</button>
            </div>
            <div className='ContactDivision'>
                <h3 className='ContactTitle'>We are here for you.</h3>
                <p className='ContactText'>If you want any suggestions or have any simple questions, please contact us.<br /><br />We are looking forward to hearing from you.</p>
                <h3 className='ContactTitle'>우리는 당신을 위해 여기 있습니다.</h3>
                <p className='ContactText'>제안을 원하시거나 간단한 질문이 있으시면 저희에게 연락하십시오.<br /><br />귀하의 연락을 기다리고 있습니다.</p>
            </div>
        </div>
    )
}
export default Contact