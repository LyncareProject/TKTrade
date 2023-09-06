import { useEffect, useState } from 'react'
import './Main.css'
import { findAllProduct } from '../../service/productService'
import testUrl from '../../service/testURL'
import Product from '../../components/Product/Product'
import Main_img from '../../assets/images/Tk_main_bg.png'
import Main_img_m from '../../assets/images/Tk_main_bg_m.png'
import Consulting from '../../assets/images/Consulting.png'
import { useNavigate } from 'react-router-dom';
import Card from '../../components/Card/Card'

const Main = ()=>{
    const [ products, setProducts ] = useState(null);
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
            {
                !products
                ? null
                :<Section02 products= { products }/>
            }
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
                <h3>Tube expander, Beveling machine, Expanding machine, Torque wrench, Branding OEM, etc</h3>
            </div>
        </div>
    )
}
const Section02 = ({ products })=>{
    const navigate = useNavigate();
    return(
        <div className='Section02'>
            {
                products.map((product, index) =>
                    <div className='CardWrap' key={ index }>
                        <Card product={ product }/>
                    </div>
                )
            }
            <a href='/product' className='MoreBtnWrap'>
                <div className='MoreBtn'>
                    <h3>More Products &gt;</h3>
                    <p>At TK TRADE with the best function and quality Find and deliver products.</p>
                </div>
            </a>
        </div>
    )
}
const Section03 = ()=>{
    return(
        <div className='Wrap , Wrap2 , wrap_m'>
            <a href='/contact' className='section_con'>
                <div>
                    <p><img src={ Consulting } alt="consulting" /></p>
                </div>
                <div className='section_con_2'>
                <h2>Consulting</h2>
                <p>&nbsp;  </p>
                <p>TK Trade always support your idea.</p>
                </div>
            </a>
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
                </a>
                <a href="/reference" className='section_con_2, section_con_3'>
                    <h2>Reference room</h2>
                    <p>&nbsp;  </p>
                    <p>Please find qualified & recommeded items within TK</p>
                </a>
            </div>
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