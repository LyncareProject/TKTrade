import { findAllProduct } from '../../service/productService';
import './Search.css'
import { useEffect, useState } from 'react'
import testUrl from '../../service/testURL'

const Search = ()=>{
    const [ input, setInput ] = useState('');
    const [ filteredData, setFilteredData ] = useState();
    const [ lang, setLang ] = useState('Eng');
    const [ data, setData ] = useState([]);

    const handleInput = (e)=>{
        setInput(e.target.value)
        const pattern = /[a-zA-Z]/;
        if(pattern.test(e.target.value)){
            setLang('Eng')
        } else {
            setLang('Kor')
        }
    }
    useEffect(()=>{
        findAllProduct().then(res => setData(res.data))
    }, [])
    useEffect(()=>{
        const result = data.filter((item)=>
            item.name.includes(input) || item.nameEng.toLowerCase().includes(input.toLowerCase())
        )
        setFilteredData(result)
    }, [input]) 
    useEffect(()=>{
        document.addEventListener('click', ()=>{
            setInput('')
        });
    }, [])
    return(
        <div className='Search'>
            <input className='SearchInput' type="text" placeholder='Search' onChange={ handleInput }/>
            {
                !input
                ? null
                : <div className='SearchResult'>
                    {
                        filteredData.map((product, index)=>
                            <a href={`/product/${ product._id }`} key={ index } className='FilteredData'>
                                <div className='FilteredDataImg'>
                                    <img src={`${testUrl}/${ product.images[0] }`} alt=''/>
                                </div>
                                {
                                    lang === "Eng"
                                    ? <p className='FilteredDataName'>{ product.nameEng }</p>
                                    : <p className='FilteredDataName'>{ product.name }</p>
                                }               
                            </a>
                        )
                    }
                </div>
            }   
        </div>
    )
}

export default Search