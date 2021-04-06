import React, { useContext, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import { userContext } from '../../App';
import Header from '../Header/Header';
import './CheckOut.css'
const CheckOut = () => {
    const [loggedInUser,setLoggedInUser] = useContext(userContext);
    const [checkout, setCheckout] = useState({});
    const {bookId}=useParams();
    useEffect(()=>{
    fetch(`https://polar-beyond-99257.herokuapp.com/checkout/${bookId}`)
    .then(res=> res.json())
    .then(data=>{
        setCheckout(data);
    })
   },[bookId]);


   const history = useHistory();
   const handleNewOrder=()=>{
   
    const   {Book,Author,Price,Photo} = {...checkout};
    const order =  {Book,Author,Price,Photo} ;
    order.time = new Date().toLocaleString();
    order.email = loggedInUser.email;
    console.log('order :', order);
     const url = `https://polar-beyond-99257.herokuapp.com/order`;
     fetch(url,{
        method:'POST',
        headers:{
            'content-type' : 'application/json'
        },
        body:JSON.stringify(order)
     })
     .then(res=> console.log('server side response: ',res));
     
     history.push('/order');
}
    
    return (
        <div>
            <Header></Header>
            <h2 style={{marginTop:'6%'}}>Check Out</h2>
            <div className="product-checkout">
            <table>
            <thead>
            <tr>
              <th>Description</th>
              <th>Quantity</th>
              <th>Price</th>
            </tr>

          </thead>
            <tbody>
            <tr>
            <td>{checkout.Book}</td>
            <td>1</td>
            <td>{checkout.Price}</td>
            </tr>

            <tr>
            <td>Total</td>
            <td></td>
            <td>{checkout.Price}</td>
            </tr>
            </tbody>
            </table>
            </div>
            <button className='order' onClick={handleNewOrder}>Order Now</button>
        </div>
    );
};

export default CheckOut;