import React from "react";
import "./Card.css";
import { Container, Row } from "react-bootstrap";

const Card = ({ imageUrl, author }) => {
  return (
    <Container>
      <Row>
        <img className="img" src={imageUrl} alt={`Name ${author}`} />
      </Row>
      <Row>Name: {author}</Row>
    </Container>
  );
};

export default Card;


// ---------------------------------------------------------------------------------

// <div className="image-card">
//   <img src={imageUrl} alt={`By ${author}`} />
//   <p>Name: {author}</p>
// </div>