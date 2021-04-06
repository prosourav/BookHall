import React, { useContext, useEffect } from 'react';
import { bookContext } from '../../App';
import Book from '../Book/Book';
import Header from '../Header/Header';
import './Home.css';
import img from './download.gif'
import { faSearch } from '@fortawesome/free-solid-svg-icons';
const Home = () => {
  const [books, setBooks] = useContext(bookContext);
  useEffect(()=>{
    const url= 'https://polar-beyond-99257.herokuapp.com/books';
    fetch(url)
    .then(res=> res.json())
    .then(data =>{
      setBooks(data);
    })
  },[books]);

    return (
        <div>{}
        <Header></Header>
        <input type='text' className='input-field' placeholder= 'Search here' />
        <input type='submit' value='Search' className='search-box' /><br/>
      { !books.length && <img src={img} style={{marginTop:'5%'}} alt=""/>}
        <div className='home-style'>
          {
            books.map(allBooks=><Book allBooks={allBooks} key={allBooks._id}></Book>)
          }
          </div> 
        
        </div>
    );
};

export default Home;