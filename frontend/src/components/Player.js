import React, { useState } from 'react';
import { getRequest } from './models';
import PlayerCard from './PlayerCard';

function Player() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [player, setPlayer] = useState([]);

  const getPlayer = () => {
    const getData = async () => {
        const data = await getRequest("player/" + firstName + '/' + lastName);
        console.log(data);
        const x = <PlayerCard name={data['name']} PTS={data['points']} TRB={data['rebounds']} AST={data['assists']}
          STL={data['steals']} BLK={data['blocks']} team={data['team']} 
          color={data['color']} imgurl={data['imgurl']} TOV={data['TOV']}/>
        setPlayer(x);
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
      {player}
    </div>
  )
}

export default Player;