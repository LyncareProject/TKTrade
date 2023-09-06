import { useState } from 'react'
import './Contact.css'
import { postEmail } from '../../service/emailService'

const Contact = ({ setSending })=>{
    const [ inputs, setInputs ] = useState({
        Name : '',
        Phone : '',
        Email : '',
        Company : '',
        Country : '',
        TextArea : ''
    })
    const { Name, Phone, Email, Company, Country, TextArea } = inputs
    const handleInput = (e)=>{
        setInputs({
            ...inputs,
            [ e.target.name ] : e.target.value
        })
    }
    const sendBtn = async ()=>{
        if(!Name || !Email) {
            return alert('please write everything')
        }
        setSending(true)
        await postEmail({
            name : Name,
            phone : Phone,
            email : Email,
            company : Company,
            country : Country,
            products : TextArea
        }).then(response => {
            if(response.data.message === 'Success'){
                alert('Complete')
                setInputs({
                    Name : '',
                    Phone : '',
                    Email : '',
                    Company : '',
                    Country : '',
                    TextArea : ''
                })
            }
            setSending(false)
        })
    }
    return(
        <div className="Contact Wrap">
            <div className='ContactBanner'>
                <h3>Contact</h3>
                <p>If you want any suggestions or have any simple questions, please contact us.<br />We are looking forward to hearing from you.</p>
            </div>
            <div className='ContactWrap'>
                <div className='ContactDivision'>
                    <div className="ContactInputSubWrap">
                        <div>
                            <label htmlFor='Name' className='ContactInputTitle'>Name <span className="Red">*</span></label>
                            <input id='Name' className='ContactInputDivision' name='Name' type="text" placeholder="Name" onChange={ handleInput } value={ Name } />
                        </div>
                        <div>
                            <label htmlFor='Phone' className='ContactInputTitle'>Phone</label>
                            <input className='ContactInputDivision' name='Phone' type="text" placeholder="Phone" onChange={ handleInput } value={ Phone } />
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
                        <h3 className='ContactInputTitle'>Country</h3>
                        <input className='ContactInput' type="text" name='Country' placeholder="Country" onChange={ handleInput } value={ Country } />
                    </div>
                </div>
                <div className='ContactDivision'>
                    <div className="ContactInputWrap">
                        <h3 className='ContactInputTitle'>Text Area</h3>
                        <textarea className='ContactTextArea' name="TextArea" id="" cols="30" rows="10" placeholder="Text Area" onChange={ handleInput } value={ TextArea } ></textarea>
                    </div>
                    <button className='SendBtn' onClick={ sendBtn }>Send</button>
                </div>
            </div>
        </div>
    )
}
export default Contact