import './Footer.css'
import Footer_logo from '../../assets/images/TK_footer_logo.png'

const Footer = ()=>{
    return(
        <div className='Footer'>
           
            <div className='Wrap , Wrap2 , Footer_text'>
                <hr className='hr_hidden' />
                <p className='footer_logo'><img src={ Footer_logo } alt="Footer_Logo" /></p>  
                <div className='footer_address'>
                    <div className='footer_address1'>
                        <div className='footer_address_1'> 
                            <h3>COMPANY : TK TRADE</h3>
                            <p>E-mail : tk-trade@naver.com</p>
                            <p>TEL : (+82)054-773-0742</p>
                            <p>FAX : (+82)054-774-0742</p>
                        </div>
                        <div className='footer_address_2'>
                            <p>Company Registration Number : 357-04-01714</p>
                            <p>ADDRESS : 1767, Sanup-Ro, Ueidong-Eup, Gyeongju-si, Republic of Korea</p>
                        </div>
                      
                    </div>
                    <div className='footer_address_1_2'>
                        {/* <p><span>개인정보처리방침</span></p> */}
                    </div>
                </div>
                <p className='copyright'>Copyrightⓒ TK-Trade All Rights Reserved</p>
            </div>
        </div>
    )
}

export default Footer