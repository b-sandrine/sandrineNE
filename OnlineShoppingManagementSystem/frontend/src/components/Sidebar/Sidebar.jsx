import './Sidebar.css'
import logo from '../../assets/LOGO.png'
import {HiHome,HiMenu} from 'react-icons/hi'
import {BsFillPeopleFill} from 'react-icons/bs'
import { Link } from 'react-router-dom'
const Sidebar = () => {
    return (
        <div className="sidebar--container">
            <div className="header">
                <img src={logo} alt="Logo Image" />
                <HiMenu size={40} style={{ color: 'white', fontWeight:'bold' }} />
            </div>
            <div className="links">
                <div className="link active">
                    <HiHome size={20}/>
                    <Link to='/dashboard/products' className="dashboard-link"><p>Dashboard</p></Link>
                </div>
                <div className="link">
                    <BsFillPeopleFill size={20} />
                    <Link to='/dashboard/products' className="dashboard-link"><p>Products</p></Link>
                </div>
                <div className="link">
                    <BsFillPeopleFill size={20} />
                    <Link to='/dashboard/cart' className="dashboard-link"><p>Cart</p></Link>
                </div>
            </div>
        </div>
    )
}

export default Sidebar;