import { faBookOpen, faHSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useHistory } from "react-router-dom";
import './AddBook.css'


  const AddBook= () => {
      const [imageUrl,setImageUrl] = useState(null);
  const { register, handleSubmit } = useForm();
 const history = useHistory();
  const handleImageUpload = event =>{
    // console.log(event.target.files[0]);
    const imageData = new FormData();
    imageData.set('key','8fa96cff7d7a3e5dd21028613fff8de4');
    imageData.append('image', event.target.files[0]);
    
    axios.post("https://api.imgbb.com/1/upload", imageData )
      .then(response => {
         console.log("success",response);
        setImageUrl(response.data.data.display_url);
      })
      .catch(error => {
        console.log("error",error);
      });
    
    } 

  const onSubmit = data =>{ 

      const bookdetail ={
          Book:data.BookName,
          Author:data.AuthorName,
          Price:data.Price,
          Photo:imageUrl
      }
    
      const url = `https://polar-beyond-99257.herokuapp.com/addBook`;
      fetch(url, {
          method:'POST',
          headers:{
              'content-type' : 'application/json'
          },
          body:JSON.stringify(bookdetail)
      })
      .then(res=> console.log('server side response: ',res)             
      );
     history.push('/manage');
    }
     
    

//   console.log(watch("example")); // watch input value by passing the name of it
  


  return (
    <div className='main-div'>

    <div className='sec-1'>
        <h1>BookHall</h1>
        <p><Link to="/manage" style={{color:'white',textDecoration:'none'}}>   <FontAwesomeIcon icon={faBookOpen}/> Manage Books </Link></p>  
        <Link to='/home' style={{color:'white',textDecoration:'none'}}><p>  <FontAwesomeIcon icon={faHSquare}/>  Home</p></Link>
        
    </div>
 <div className='sec-2'>
        <div className='heading'>
           <h1>Add Book</h1>
        </div>
        <div className='form'>
            <form onSubmit={handleSubmit(onSubmit)}>
            <div className='my-div'>
              <div>
                  <label>Book Name</label><br/>
                  <input className='input' name="BookName" placeholder='Enter Name'  ref={register({ required: true, maxLength: 30 })} /> 
              </div>
              <div>
                  <label>Author Name</label><br/>
                  <input className='input' name="AuthorName" placeholder='Enter Name'  ref={register({ required: true, maxLength: 40 })} />
              </div>
            </div>
            <div className='my-div2'>
              <div style={{marginLeft:'65px', marginRight:'160px', marginBottom:'10px'}}>
                  <label>Price</label><br/>
                  <input className='input' name="Price" placeholder='Enter Price' type="number" ref={register({ min: 2, max: 999 })} />
              </div>

              <div style={{marginTop:'10px'}}>
                <input className='input' type='file' onChange={handleImageUpload}/>
              </div>

              </div>
          {imageUrl &&  <input type="submit" style={{background:'green', color:'white'}}/>  }
            </form>
         
        </div>
    </div>
</div>
  );
}
export default AddBook;