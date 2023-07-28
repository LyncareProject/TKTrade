import './Search.css'
import { useEffect, useState } from 'react'
import Data from '../../Data'

const Search = ()=>{
    const [ input, setInput ] = useState('');
    const [ filteredData, setFilteredData ] = useState();
    const [ lang, setLang ] = useState('Eng');

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
        const result = Data.filter((data)=>
            data.name.includes(input) || data.nameEng.toLowerCase().includes(input.toLowerCase())
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
                        filteredData.map((a, i)=>
                            <a href={`/product/${ a.id }`} key={ i } className='FilteredData'>
                                <div className='FilteredDataImg'>
                                    <img src={`/images/${ a.images[0] }`} alt=''/>
                                </div>
                                {
                                    lang === "Eng"
                                    ? <p className='FilteredDataName'>{ a.nameEng }</p>
                                    : <p className='FilteredDataName'>{ a.name }</p>
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