import './Footer.css'
import Footer_logo from '../../assets/images/TK_footer_logo.png'

const Footer = ()=>{
    return(
        <div className='Footer'>
           
            <div className='Wrap , Wrap2'>
                <hr />
                <p className='footer_logo'><img src={ Footer_logo } alt="Footer_Logo" /></p>  
                <div className='footer_address'>
                    <div className='footer_address1'>
                        <div className='footer_address_1'> 
                            <h3>COMPANY : TK TRADE</h3>
                            <p>E-mail : tk-trade@naver.com</p>
                            <p>TEL : 054-773-0742</p>
                            <p>FAX : 054-774-0742</p>
                        </div>
                        <div className='footer_address_2'>
                            <p>Company Registration Number : 357-04-01714</p>
                            <p>ADDRESS : 1767, Saneop-ro, Oedong-eup, Gyeongju-si, Gyeongsangbuk-do, Republic of Korea</p>
                        </div>
                      
                    </div>
                    <div>
                        <p><span>개인정보처리방침</span></p>
                    </div>
                </div>
                <p className='copyright'>Copyrightⓒ 2023 TKtrade All Reserved</p>
            </div>
        </div>
    )
}

export default Footer