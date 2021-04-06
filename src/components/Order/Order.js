import React, { useContext, useEffect, useState } from 'react';
import { userContext } from '../../App';
import Header from '../Header/Header';
import './order.css'


const Order = () => {
    const [loggedInUser,setLoggedInUser]  = useContext(userContext);
const [order,setOrder] = useState([])
useEffect(()=>{
    const url = `https://polar-beyond-99257.herokuapp.com/order?email=${loggedInUser.email}`;
    fetch(url)
    .then(res => res.json())
    .then(data=>{
     setOrder(data);
    })
},[order]);

// console.log(order);

    return (
        <div>
        <Header/>
        <h1 className='text'><span style={{color:'#3f3f88'}}>{loggedInUser.name} </span>Your Orders: </h1>
            {
                order.map(order=> <div className='order-div'>
                <div className='product'>
                <img src={order.Photo} key={order.time}  alt=""/>
                <h4>{order.Book}</h4>
                </div>
               
                <div className='About'>
              <h3 style={{color:'#3f3f88'}}> Quantity : 1 </h3>
              <h6>Order Placed: {order.time}</h6>
              </div>
              <div>
            <h2 style={{color:'#3f3f88'}}>  Price : ${order.Price}</h2> 
               </div>
               
                </div>)
            }
        </div>
    );
};

export default Order;
