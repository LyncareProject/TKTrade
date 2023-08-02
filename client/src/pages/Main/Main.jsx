import { useEffect, useState } from 'react'
import './Main.css'
import { findAllProduct } from '../../service/productService'
import testUrl from '../../service/testURL'
const Main = ()=>{
    const [ products, setProducts ] = useState([])

    useEffect(()=>{
        const fetchData = async ()=>{
            await findAllProduct().then(res=>{
                const sliceProducts = res.data.slice(0, 6)
                setProducts(sliceProducts)
            })
        }
        fetchData()
    },[])

    return(
        <div className='Main'>
            <Section01 products= { products }/>
            <Section02 />
            <Section03 />
            <Section04 />
            <Section05 />
        </div>
    )
}
const Section01 = ({ products })=>{
    return(
        <div className='Wrap'>
            { 
                products.map( product =>
                    <div>
                        <img src={`${testUrl}/${ product.images[0] }`} alt="" />
                        <p>{ product.nameEng }</p>
                        <p>{ product.content }</p>
                        <p>{ product.contentEng }</p>
                    </div>
                )
            }
            <div>
                더보기
            </div>
        </div>
    )
}
const Section02 = ()=>{
    return(
        <div className='Wrap'>
            Section02
        </div>
    )
}
const Section03 = ()=>{
    return(
        <div className='Wrap'>
            Section03
        </div>
    )
}
const Section04 = ()=>{
    return(
        <div className='Wrap'>
            Section04
        </div>
    )
}
const Section05 = ()=>{
    return(
        <div className='Wrap'>
            Section05
        </div>
    )
}

export default Main