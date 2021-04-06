import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import Header from "../Header/Header";
import "./ManageBooks.css";

const ManageBooks = () => {
  const [books, setBooks] = useState([]);
  useEffect(()=>{
   fetch('https://polar-beyond-99257.herokuapp.com/books')
   .then(res => res.json())
   .then(data=>{
     setBooks(data);
   })
  },[books]);
  // console.log("Testing :",books);

  const handleDelete = (id) => {
    const url = `https://polar-beyond-99257.herokuapp.com/delete/${id}`
      fetch(url,{
         method:'DELETE'  
      })
      .then(res => res.json())
      .then(result =>{
      console.log('success',result);
      })
  };
  return (
    <div>
      <Header></Header>
      <div style={{ marginTop: "80px", padding: "10px 5%" }}>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Book Name</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book) => (
              <tr key={book._id}>
                <td>{book.Book}</td>
                <td>${book.Price}</td>
                <td>
                  <button>Edit</button>
                  <button style={{margin:'2px 4px',color:'white', background:'red'}}
                    onClick={() => {
                      handleDelete(`${book._id}`);
                    }}
                  >
                  <FontAwesomeIcon icon={faTrash}/>  Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default ManageBooks;
