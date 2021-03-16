import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../App';
import logo from '../../images/logo.png';
import './Header.css';

const Header = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const buttonStyle ={
        padding:'4px', 
        fontSize:'18px',
        justifyContent: 'center',
        outline:'none',
        alignItems: 'center'     
    }
    return (
        <div className="header">
            <h1>Turan's-Shop</h1>
            <img src={logo} alt="" />
            <nav>
                <Link to="/shop">Shop</Link>
                <Link to="/review">Order Review</Link>
                <Link to="/inventory">Manage Inventory</Link>
                <button onClick={()=> setLoggedInUser({})} style={buttonStyle} >Sign out</button>
            </nav>
        </div>
    );
};

export default Header;