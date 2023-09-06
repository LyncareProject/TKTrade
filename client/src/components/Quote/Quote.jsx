import { useState } from 'react'
import './Quote.css'
import { postEmail } from '../../service/emailService'

const Quote = ({ setSending })=>{
    const [ quote, setQuote ] = useState(false)
    const [ input, setInput ] = useState({
        name : '',
        email : '',
        phone : '',
        company : '',
        country : '',
        products : ''
    })
    const { name, email, phone, company, country, products } = input
    console.log(input)
    const handleInput = (e)=>{
        setInput({
            ...input,
            [ e.target.name ] : e.target.value
        })
    }
    const sendBtn = async ()=>{
        if( !name || !email ) {
            return alert('Please fill in the required information')
        }
        setSending(true)
        await postEmail({
            name,
            phone,
            email,
            company,
            country,
            products
        }).then(response => {
            setSending(false)
            alert('Complete')
            setQuote(false)
            setInput({
                name : '',
                email : '',
                phone : '',
                company : '',
                country : '',
                products : ''
            })
        })
        .catch(err => {
            setSending(false)
            alert(`ERR : ${ err.message.message }`)
        })
    }
    return(
        <div className={
            !quote
            ? 'Quote QuoteClosed'
            : 'Quote QuoteOpen'
        }>
            <div className='QuoteContent'>
                <label htmlFor="name">Name <span>*</span></label>
                <input type="text" name='name' value={ name } onChange={ handleInput }/>
                <label htmlFor="email">Email <span>*</span></label>
                <input type="text" name='email' value={ email } onChange={ handleInput }/>
                <label htmlFor="phone">Phone</label>
                <input type="text" name='phone' value={ phone }  onChange={ handleInput }/>
                <label htmlFor="company">Company</label>
                <input type="text" name='company' value={ company } onChange={ handleInput }/>
                <label htmlFor="company">Country</label>
                <input type="text" name='country' value={ country } onChange={ handleInput }/>
                <label htmlFor="products">Products of Interest</label>
                <input type="text" name='products' value={ products } onChange={ handleInput }/>
                <button onClick={ sendBtn }>SEND</button>
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