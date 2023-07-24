import { useState } from 'react'
import './Quote.css'

const Quote = ()=>{
    const [ quote, setQuote ] = useState(false)
    return(
        <div className={
            !quote
            ? 'Quote QuoteClosed'
            : 'Quote QuoteOpen'
        }>
            <div className='QuoteContent'>
                <label htmlFor="name">name</label>
                <input type="text" name='name'/>
                <label htmlFor="Company">Company</label>
                <input type="text" name='Company'/>
                <label htmlFor="Phone">Phone</label>
                <input type="text" name='Phone' />
                <label htmlFor="Email">Email</label>
                <input type="text" name='Email'/>
                <label htmlFor="Products">Products of Interest</label>
                <input type="text" name='Products'/>
                <button>Submit</button>
            </div>
            <div className='QuoteBtn' onClick={()=>{
                setQuote(!quote)
            }}>
                <p>Get a Quote</p>
            </div>
        </div>
    )
}

export default Quote