import { useState } from 'react'
import './Quote.css'
import { postEmail } from '../../service/emailService'

const Quote = ()=>{
    const [ quote, setQuote ] = useState(false)
    const [ input, setInput ] = useState({
        name : '',
        company : '',
        phone : '',
        email : '',
        products : ''
    })
    const { name, company, phone, email, products } = input
    const handleInput = (e)=>{
        setInput({
            ...input,
            [ e.target.name ] : e.target.value
        })
    }
    const sendBtn = ()=>{
        if( !name || !company || !phone || !email || !products) {
            return alert('Please fill in the required information')
        }
        postEmail({
            name,
            company,
            phone,
            email,
            products
        }).then(response => {
            console.log(response.data.message)
            if(response.data.message === 'Success'){
                alert('Complete')
                setQuote(false)
                setInput({
                    name : '',
                    company : '',
                    phone : '',
                    email : '',
                    products : ''
                })
            }
        })
        .catch(err => alert(`ERR : ${ err.message.message }`))
    }
    return(
        <div className={
            !quote
            ? 'Quote QuoteClosed'
            : 'Quote QuoteOpen'
        }>
            <div className='QuoteContent'>
                <label htmlFor="name">name</label>
                <input type="text" name='name' value={ name } onChange={ handleInput }/>
                <label htmlFor="company">Company</label>
                <input type="text" name='company' value={ company } onChange={ handleInput }/>
                <label htmlFor="phone">Phone</label>
                <input type="text" name='phone' value={ phone }  onChange={ handleInput }/>
                <label htmlFor="email">Email</label>
                <input type="text" name='email' value={ email } onChange={ handleInput }/>
                <label htmlFor="products">Products of Interest</label>
                <input type="text" name='products' value={ products } onChange={ handleInput }/>
                <button onClick={ sendBtn }>Submit</button>
            </div>
            <div className='QuoteBtn' onClick={()=>{
                setQuote(!quote)
            }}>
                <p>CONTACT</p>
            </div>
        </div>
    )
}

export default Quote