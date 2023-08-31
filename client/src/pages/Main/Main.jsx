import { useEffect, useState } from 'react'
import './Main.css'
import { findAllProduct } from '../../service/productService'
import testUrl from '../../service/testURL'
import Product from '../../components/Product/Product'
import Main_img from '../../assets/images/Tk_main_bg.png'
import Main_img_m from '../../assets/images/Tk_main_bg_m.png'
import Consulting from '../../assets/images/Consulting.png'
import { useNavigate } from 'react-router-dom';

const Main = ()=>{
    const [ products, setProducts ] = useState([]);
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
        <div  className='Main'>
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
        <div className='Main_bg , wrap_m' >
                <p className='Main_img'><img src={ Main_img } alt="Logo" /></p>  
                <p className='Main_img_m'><img src={ Main_img_m } alt="Logo" /></p>  
            <div className='Main_txt'>
                <h2>TK TRADE</h2>
                <h3>Orbital welding machines and Etc Rental, Order</h3>
            </div>
        </div>
    )
}
const Section02 = ({ products })=>{
    const navigate = useNavigate();
    return(
        <div className='Wrap , Wrap_flex , Wrap2 , wrap_m'>
            { 
                products.map((product, index) =>
                    <a href={`/product/${ product._id }`} className='product' key={ index }>
                        <Product product = {product} testUrl={testUrl}/>
                    </a>
                )
            }
            <div className='more_s'>
                <a href='/product' className='more'>
                    <h2>More Products &nbsp;&nbsp;&nbsp; <span>  &gt; </span></h2>
                    <h3>더 많은 제품 보기</h3>
                    <p>At TK TRADE with the best function and quality Find and deliver products.
                    <br />
                    </p>
                </a>
                <div className='more_menu'>
                    <ul>
                        <li onClick={()=>{
                            navigate('/product', { state : "TUBE EXPANDERS"})
                        }}><p>TUBE EXPANDERS</p></li>
                        <li onClick={()=>{
                            navigate('/product', { state : "TUBE EXPANDING M/C"})
                        }}><a href="">TUBE EXPANDING M/C</a></li>
                        <li onClick={()=>{
                            navigate('/product', { state : "INSTALLATION TOOLS"})
                        }}><a href="">INSTALLATION TOOLS</a></li>
                        <li onClick={()=>{
                            navigate('/product', { state : "TUBE PULLERS"})
                        }}><a href="">TUBE PULLERS</a></li>
                        <li onClick={()=>{
                            navigate('/product', { state : "ACCESORIES"})
                        }}><a href="">ACCESORIES</a></li>
                    </ul>
                </div>
            </div>
        </div>
    )
}
const Section03 = ()=>{
    return(
        <div className='Wrap , Wrap2 , wrap_m'>
           <div className='section_con'>
                <div>
                    <p><img src={ Consulting } alt="consulting" /></p>
                </div>
                <div className='section_con_2'>
                 <h2>Consulting</h2>
                 <p>&nbsp;  </p>
                 <p>TK Trade always support your idea.</p>
                 {/* <p>정보이엔지의 오비탈 용접기는 튜브 대 튜브 와 튜브 대 튜브시트, 인보어용
                    접에 사용할 수 있습니다.</p> */}
                </div>
           </div>
          {/*  <div className='section_con'>
                <div>
                    <p><img src="" alt="" /></p>
                </div>
                <div className='section_con_2'>
                 <h2>RENTAL</h2>
                 <p>&nbsp; </p>
                 <p>Orbital welding machines of JEONG BO ENG are used
                    in Tube to tube, Tube to Tube-sheet and internal bore
                    welding.</p>
                 <p>정보이엔지의 오비탈 용접기는 튜브 대 튜브 와 튜브 대 튜브시트, 인보어용
                    접에 사용할 수 있습니다.</p> 
                </div>
           </div>*/}
        </div>
    )
}
const Section04 = ()=>{
    return(
        <div className='Wrap , Wrap2 , Wrap_m'>
           <div className='section_con'>
              <a href="/contact" className='section_con_2, section_con_3'>
                 <h2>Contact us</h2>
                 <p>&nbsp;  </p>
                 <p>All inquiries will meet in 3-days from the skilled worker.</p>
                 {/* <p></p> */}
              </a>
              <a href="/reference" className='section_con_2, section_con_3'>
                 <h2>Reference room</h2>
                 <p>&nbsp;  </p>
                 <p>Please find qualified & recommeded items within TK</p>
                 {/* <p></p> */}
              </a>
           </div>
           {/* <div className='section_con_4'>
                <div className='section_con_4_1'>
                    <p>TK TRADE 카탈로그입니다</p>
                    <p>단일 플랫폼에서 지능형 자산 관리, 모니터링, 예측 유지보수 및 신뢰성 제공</p>
                </div>
                <div className='section_con_4_2'>
                    <p>Read More</p>
                    <p><span> &gt; </span></p>
                </div>
           </div> */}
        </div>
    )
}
const Section05 = ()=>{
    return(
        <div className='Wrap , Wrap2 , Wrap_m'>
            <div className='section_con_5'>
                <div className='section_con_5_1'>
                    <h3>Company profile</h3>
                    <p>&nbsp;   </p>
                    <p>TK will serve all kind of Korean tools at your requirement</p>
                </div>
                <a href='/profile' className='section_con_5_2'>
                    <p>Read More</p>
                    <p><span> &gt; </span></p>
                </a>
           </div>
        </div>
    )
}

export default Main