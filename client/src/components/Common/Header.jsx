import './Header.css'
import { Link } from 'react-router-dom';
import data from '../../Data'
import Search from '../Search/Search';

const company = [
    { name: 'Greeting', href: '/'},
    { name: 'History', href: '/'},
    { name: 'Field Of Business', href: '/'},
    { name: 'Contact', href: '/'}
]

function Header() {
    // const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    return (
        <div className='Header'>
            <div className='Wrap'>
                <div className='Logo'>
                    <Link to='/'>
                        <h2>TK Trade</h2>
                    </Link>
                </div>
                <div className='MenuList'>
                    <div className='Menu CompanyMenu'>
                        <p>Company</p>
                        <div className='CompanySubMenu'>
                            {
                                company.map((a, i)=>
                                    <a href={ a.href } className='SubMenu' key={ i }>
                                        <p>{ a.name }</p>
                                    </a>
                                )
                            }
                        </div>
                    </div>
                    <div className='Menu ProductsMenu'>
                        <p>Products</p>
                        <div className='ProductsSubMenu'>
                            {
                                data.map((a, i)=>
                                    <a href={`/product/${a.id}`} className='SubMenu' key={ i }>
                                        <p>{ a.name }</p>
                                    </a>
                                )
                            }
                        </div>
                    </div>
                    <Link to='/' className='Menu'>
                        <p>Rental</p>
                    </Link>
                    <Link to='/' className='Menu'>
                        <p>Customer</p>
                    </Link>
                </div>
                <Search />
            </div>
        </div>
    )
}

export default Header;