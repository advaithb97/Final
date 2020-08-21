import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, ListGroup, ListGroupItem } from 'react-bootstrap';


export default function DoublePlayer({name, PTS, TRB, AST, STL, BLK,
      name2, PTS2, TRB2, AST2, STL2, BLK2, imgurl, team, imgurl2, team2}) {
  
  return (
    <div>
<div class="container">
  <div class="card-columns d-flex justify-content-center">
  <Card bg='primary' style={{ width: '20rem' }}>
  <Card.Img variant="top" src={imgurl} style={{ width: '150px' }}/>
  <Card.Body>
    <Card.Title><h4>{name}</h4></Card.Title>
  </Card.Body>
  <ListGroup className="list-group-flush">
    <ListGroupItem>points: {PTS}</ListGroupItem>
    <ListGroupItem>rebounds: {TRB}</ListGroupItem>
    <ListGroupItem>assists: {AST}</ListGroupItem>
    <ListGroupItem>steals: {STL}</ListGroupItem>
    <ListGroupItem>blocks: {BLK}</ListGroupItem>
  </ListGroup>
  <Card.Body>
    <Card.Text>Team: {team}</Card.Text>
  </Card.Body>
</Card>

<Card bg='secondary' style={{ width: '20rem' }}>
  <Card.Img variant="top" src={imgurl2} style={{ width: '150px' }}/>
  <Card.Body>
    <Card.Title><h4>{name2}</h4></Card.Title>
  </Card.Body>
  <ListGroup className="list-group-flush">
    <ListGroupItem>points: {PTS2}</ListGroupItem>
    <ListGroupItem>rebounds: {TRB2}</ListGroupItem>
    <ListGroupItem>assists: {AST2}</ListGroupItem>
    <ListGroupItem>steals: {STL2}</ListGroupItem>
    <ListGroupItem>blocks: {BLK2}</ListGroupItem>
  </ListGroup>
  <Card.Body>
    <Card.Text>Team: {team2}</Card.Text>
  </Card.Body>
</Card>

<br></br>
    </div>
  </div>
  </div>
  )
}