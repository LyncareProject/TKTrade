import './Header.css'
import { Link } from 'react-router-dom';
import Search from '../Search/Search';
import Logo from '../../assets/images/Logo.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const company = [
    { name: 'Greeting', href: '/'},
    { name: 'History', href: '/'},
    { name: 'Field Of Business', href: '/'},
    { name: 'Contact', href: '/'}
]

function Header({ setSidebar }) {
    const handleSidebar = ()=>{
        setSidebar(true)
    }
    const [checkedCategory, setCheckedCategory] = useState('');
    return (
        <div className='Header'>
            <div className='Wrap'>
                <button onClick={ handleSidebar } className='SidebarBtn'>
                    <FontAwesomeIcon icon={ faBars } />
                </button>
                <div className='Logo'>
                    <Link to='/'>
                        <img src={ Logo } alt="Logo" />
                    </Link>
                </div>
                

                <div className='MenuList'>
                    <Link to='/' className='Menu'>
                        <p>MAIN</p>
                    </Link>

                    

                   { 
                   <Link to='/product' className='Menu'>
                        <p>PRODUCT</p>
                    </Link>}
                    {/* <div className='Menu ProductsMenu'>
                        <p>PRODUCTS</p>
                        <div className='ProductsSubMenu'>
                            {
                                data.map((a, i)=>
                                    <a href={`/product/${a.id}`} className='SubMenu' key={ i }>
                                        <p>{ a.name }</p>
                                    </a>
                                )
                            }
                        </div>
                    </div> */}

                    <Link to='/contact' className='Menu'>
                        <p>CONTACT</p>
                    </Link>

                    <Link to='/profile' className='Menu'>
                        <p>PROFILE</p>
                    </Link>
                    
                    {/* <Link to='/customer' className='Menu'>
                         <p>CUSTOMER</p> 
                        <p>Contact</p>

                    </Link> */}
                    
                    {/* <div className='Menu CompanyMenu'>
                        <p>COMPANY</p>
                        <div className='CompanySubMenu'>
                            {
                                company.map((a, i)=>
                                    <a href={ a.href } className='SubMenu' key={ i }>
                                        <p>{ a.name }</p>
                                    </a>
                                )
                            }
                        </div>
                    </div> */}
                </div>
                <Search />
            </div>
        </div>
    )
}

export default Header;