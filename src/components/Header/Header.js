import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { userContext } from '../../App';
import './Header.css'
const Header = () => {
    const [loggedInUser,setLoggedInUser]  = useContext(userContext);
  
    const style={
       textDecoration:'none',
       color:'black',
    }
    return (
        <div>
            <div className='header'>
                <div className='section-1'>
                <h2>BookHall</h2>
                </div>
            <div className='section-2'>
                <li> <Link to="/home" style={style}>Home</Link></li>
                <li> <Link to="/order" style={style}>Orders</Link></li>
                <li> <Link to="/addBooks" style={style}>AddBooks </Link> </li> 
 {  !loggedInUser.name ? <button  style={{backgroundColor:'red', padding: '4px 22px', borderRadius:'4px'}}><Link to="/login"style={{color:'white',textDecoration:'none'}}>Login</Link></button>
  : <button style={{backgroundColor:'green', padding: '6px 12px', borderRadius:'4px', color:'white'}}>{loggedInUser.name}</button>}
            </div>
            
            </div>
        </div>
    );
};

export default Header;