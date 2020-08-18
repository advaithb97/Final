import React, { useState } from 'react';
import { getRequest } from './models';

function Player() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [points, setPoints] = useState(0);
  const [assists, setAssists] = useState(0);
  const [rebounds, setRebounds] = useState(0);
  const [steals, setSteals] = useState(0);
  const [blocks, setBlocks] = useState(0);
  const [turnovers, setTurnovers] = useState(0);
  const [efg, setEfg] = useState(0);

  const getPlayer = () => {
    const getData = async () => {
        const data = await getRequest("player/" + firstName + '/' + lastName);
        console.log(data);
        setPoints(data['points']);
        setRebounds(data['rebounds']);
        setAssists(data['assists']);
        setSteals(data['steals']);
        setBlocks(data['blocks']);
        setTurnovers(data['turnovers']);
        setEfg(data['efg']);
    }
    getData();
  }
    

  return (
    <div>
      <br></br>
    <br></br>
    <br></br>
    <br></br>
      <input onChange={e => setFirstName(e.target.value)} placeholder="Enter first name"/>
      <input onChange={e => setLastName(e.target.value)} placeholder="Enter last name"/>
      <button onClick={getPlayer}>Get Info</button>
      <p>points: {points}</p>
      <p>rebounds: {rebounds}</p>
      <p>assists: {assists}</p>
      <p>steals: {steals}</p>
      <p>blocks: {blocks}</p>
      <p>turnovers: {turnovers}</p>
      <p>efg: {efg}</p>
    </div>
  )
}

export default Player;