import { useEffect, useState } from 'react'
import './Main.css'
import { findAllProduct } from '../../service/productService'
import testUrl from '../../service/testURL'
import Product from '../../components/Product/Product'
import Main_img from '../../assets/images/Tk_main_bg.png'

const Main = ()=>{
    const [ products, setProducts ] = useState([])

    useEffect(()=>{
        const fetchData = async ()=>{
            await findAllProduct().then(res=>{
                const sliceProducts = res.data.slice(0, 7)
                setProducts(sliceProducts)
            })
        }
        fetchData()
    },[])

    return(
        <div className='Main'>
            <Section01 />
            <Section02 products= { products }/>
            <Section03 />
            <Section04 />
            <Section05 />
        </div>
    )
}
const Section01 = ()=>{
    return(
        <div className='Main_bg' >
             <p><img src={ Main_img } alt="Logo" /></p>  
            <div className='Main_txt'>
             <h2>TK TRADE</h2>
             <h3>Orbital welding machines and Etc Rental, Order</h3>
            </div>
        </div>
    )
}
const Section02 = ({ products })=>{
    return(
        <div className='Wrap , Wrap_flex , Wrap2'>
           { 
               products.map( product =>
                   <div className='product'>
                       <Product product = {product} testUrl={testUrl}/>
                   </div>
               )
           }
           <div>
               <div className='more'>
                <h2>More Products &nbsp;&nbsp;&nbsp; <span>  &gt; </span></h2>
                <h3>더 많은 제품 보기</h3>
                <p>TK TRADE에서는<br /> 
                    최상의 기능과 품질을 가진<br />
                    제품을 찾아내고 제공합니다.</p>
               </div>
               <div className='more_menu'>
                <ul>
                    <li><a href="">확관툴</a></li>
                    <li><a href="">튜브확관기</a></li>
                    <li><a href="">튜브설치도구</a></li>
                    <li><a href="">소모품</a></li>
                    <li><a href="">튜브풀러</a></li>
                </ul>
               </div>
           </div>
       </div>
    )
}
const Section03 = ()=>{
    return(
        <div className='Wrap, Wrap2'>
           <div className='section_con'>
                <div>
                    <p><img src="" alt="" /></p>
                </div>
                <div className='section_con_2'>
                 <h2>작업컨설팅</h2>
                 <p>정보이엔지의 오비탈 용접기는 튜브 대 튜브 와 튜브 대 튜브시트, 인보어용
                    접에 사용할 수 있습니다.</p>
                 <p>Orbital welding machines of JEONG BO ENG are used
                    in Tube to tube, Tube to Tube-sheet and internal bore
                    welding.</p>
                </div>
           </div>
           <div className='section_con'>
                <div>
                    <p><img src="" alt="" /></p>
                </div>
                <div className='section_con_2'>
                 <h2>RENTAL</h2>
                 <p>정보이엔지의 오비탈 용접기는 튜브 대 튜브 와 튜브 대 튜브시트, 인보어용
                    접에 사용할 수 있습니다.</p>
                 <p>Orbital welding machines of JEONG BO ENG are used
                    in Tube to tube, Tube to Tube-sheet and internal bore
                    welding.</p>
                </div>
           </div>
        </div>
    )
}
const Section04 = ()=>{
    return(
        <div className='Wrap, Wrap2'>
           <div className='section_con'>
              <div className='section_con_2, section_con_3'>
                 <h2>견적문의</h2>
                 <p>정보이엔지의 오비탈 용접기는 튜브 대 튜브 와 튜브 대 튜브시트, 인보어용접에 사용할 수 있습니다.</p>
                 {/* <p></p> */}
              </div>
              <div className='section_con_2, section_con_3'>
                 <h2>자료실</h2>
                 <p>정보이엔지의 오비탈 용접기는 튜브 대 튜브 와 튜브 대 튜브시트, 인보어용접에 사용할 수 있습니다.</p>
                 {/* <p></p> */}
              </div>
           </div>
           <div className='section_con_4'>
                <div className='section_con_4_1'>
                    <p>TK TRADE 카탈로그입니다</p>
                    <p>단일 플랫폼에서 지능형 자산 관리, 모니터링, 예측 유지보수 및 신뢰성 제공</p>
                </div>
                <div className='section_con_4_2'>
                    <p>자세히보기 </p>
                    <p><span> &gt; </span></p>
                </div>
           </div>
        </div>
    )
}
const Section05 = ()=>{
    return(
        <div className='Wrap, Wrap2'>
            <div className='section_con_5'>
                <div className='section_con_5_1'>
                    <h3>회사소개</h3>
                    <p>TK TRADE 카탈로그입니다</p>
                    <p>단일 플랫폼에서 지능형 자산 관리, 모니터링, 예측 유지보수 및 신뢰성 제공</p>
                </div>
                <div className='section_con_5_2'>
                    <p>자세히보기 </p>
                    <p><span> &gt; </span></p>
                </div>
           </div>
        </div>
    )
}

export default Main