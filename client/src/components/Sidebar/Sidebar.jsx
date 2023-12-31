import './Sidebar.css'
import Logo from '../../assets/images/Logo.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse, faWrench, faUsers, faIndustry, faEnvelope } from '@fortawesome/free-solid-svg-icons'

const Sidebar = ({
    sidebar,
    setSidebar
})=>{
    const handleSidebar = ()=>{
        setSidebar(false)
    }
    const Menu = [
        {
            href: '/',
            icon: faHouse,
            name : 'Main'
        }, 
        {
            href: '/Product',
            icon : faWrench,
            name : 'Product'
        }, 
        {
            href: '/Contact',
            icon : faUsers,
            name : 'Contact'
        }, 
        {
            href: '/Profile',
            icon : faIndustry,
            name : 'Profile'
        }, 
        // {
        //     href: '/',
        //     icon : faEnvelope,
        //     name : 'PRODUCT INQUIRIES'
        // }, 
    ]
    return(
        <div>
            <div className={
                    !sidebar
                    ? "Sidebar Closed"
                    : "Sidebar Open"
                }>
                <a href="/">
                    <img src={ Logo } alt="Logo" className='MobileLogo'/>
                </a>
                {
                    Menu.map((a, i)=>
                        <a href={ a.href } className='MobileMenu' key={ i }>
                            <FontAwesomeIcon className='MobileIcon' icon={ a.icon } />
                            { a.name }
                        </a>
                    )
                }
                {/* <a href="/" className='MobileMenu'>HOME</a>
                <a href="/" className='MobileMenu'>PRODUCTS</a>
                <a href="/" className='MobileMenu'>CUSTOMER</a>
                <a href="/" className='MobileMenu'>COMPANY</a>
                <a href="/" className='MobileMenu'>PRODUCT INQUIRIES</a> */}
                {/* <button onClick={ handleSidebar }>X</button> */}
            </div>
            {
                !sidebar
                ? null
                : <div onClick={ handleSidebar } className="SidebarOut"></div>
            }
        </div>
    )
}
export default Sidebar