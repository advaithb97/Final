import React, { useState } from 'react';
import { getRequest } from './models';
import PlayerCard from './PlayerCard';

function Player() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [name, setName] = useState("");
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

  const searchPlayer = () => {
    const getData = async () => {
        const firstName = name.slice(0, name.indexOf(' '));
        const lastName = name.slice(name.indexOf(' ')+1);
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
    <center>
    <h4>Search Player</h4>
    <label for="inputName" class="sr-only">Name</label>
    <input type="Name" id="inputName" class="form-control" placeholder="Name" style={{ width: '18rem' }} 
          onChange={e => setName(e.target.value)} required/>
    <button type="button" class="btn btn-warning" onClick={searchPlayer}>Get Info</button>
      {player}
    </center>
    </div>
  )
}

export default Player;