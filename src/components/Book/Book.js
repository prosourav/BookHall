import React from 'react';
import { Button, Card } from 'react-bootstrap';
import { useHistory } from 'react-router';
const Book = (props) => {
  // console.log('props: ',props);
 const {_id,Book,Photo,Author,Price} = props.allBooks;
 const history = useHistory();
 function handleCheckOut(x){
  const url =`/checkOut/${_id}`;
  history.push(url);
  // console.log(name);
 }
 const cardStyle={
  width: '23rem', 
  height:'25rem', 
  alignItems:'center',
  paddingTop:'50px',
  marginTop:'50px',
  backgroundColor:' rgb(239, 241, 241)',
  border:'none',
  borderRadius:'6px'
 }
    return (
        <div>
        <Card style={cardStyle}>
        <Card.Img variant="top" src={Photo} style={{height:'12em',width:'12em'}}  />
        <Card.Body>
        {  <Card.Title>{Author}</Card.Title>}
         { <Card.Text>
            Price :${Price}
          </Card.Text>}
          <Button style={{backgroundColor:'rgb(53, 37, 123)'}} onClick={()=>handleCheckOut(`${_id}`)}>Add to Cart</Button>
        </Card.Body>
      </Card>
        </div>
    );
};

export default Book;