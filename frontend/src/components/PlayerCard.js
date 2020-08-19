import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, ListGroup, ListGroupItem } from 'react-bootstrap';


export default function PlayerCard({name, PTS, TRB, AST, STL, BLK, TOV, color, imgurl, team}) {
  
  return (
    <div>
<center>
<Card bg={color} style={{ width: '20rem' }}>
    <center>
  <Card.Img variant="top" src={imgurl} style={{ width: '150px' }}/>
    </center>
  <Card.Body>
    <Card.Title><h4>{name}</h4></Card.Title>
  </Card.Body>
  <ListGroup className="list-group-flush">
    <ListGroupItem>points: {PTS}</ListGroupItem>
    <ListGroupItem>rebounds: {TRB}</ListGroupItem>
    <ListGroupItem>assists: {AST}</ListGroupItem>
    <ListGroupItem>rebounds: {STL}</ListGroupItem>
    <ListGroupItem>rebounds: {BLK}</ListGroupItem>
    <ListGroupItem>turnovers: {TOV}</ListGroupItem>
  </ListGroup>
  <Card.Body>
    <Card.Text>Team: {team}</Card.Text>
  </Card.Body>
</Card>
<br></br>
</center>
    </div>
  )
}