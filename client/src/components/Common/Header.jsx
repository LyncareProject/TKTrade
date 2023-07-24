import { useState } from 'react';
import './Header.css'
import { Link } from 'react-router-dom';
import data from '../../Data'

const company = [
    { name: 'Greeting', href: '/'},
    { name: 'History', href: '/'},
    { name: 'Contact', href: '/'}
  ]
const products = [
  { name: 'Analytics', description: 'Get a better understanding of your traffic', href: '#'},
  { name: 'Engagement', description: 'Speak directly to your customers', href: '#',},
  { name: 'Security', description: 'Your customers’ data will be safe and secure', href: '#'},
  { name: 'Integrations', description: 'Connect with third-party tools', href: '#'},
  { name: 'Automations', description: 'Build strategic funnels that will convert', href: '#'},
]


function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

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
                                <Link to={ a.href } className='SubMenu' key={ i }>
                                    <p>{ a.name }</p>
                                </Link>
                            )
                        }
                    </div>
                </div>
                <div className='Menu ProductsMenu'>
                    <p>Products</p>
                    <div className='ProductsSubMenu'>
                        {
                            data.map((a, i)=>
                                <Link to={`/product/${a.id}`} className='SubMenu' key={ i }>
                                    <p>{ a.name }</p>
                                </Link>
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
            <div className='Search'>
                <input type="text" placeholder='Search' />
            </div>
        </div>
    </div>
  )
}

export default Header;