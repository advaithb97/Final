import React, { useState, useEffect } from 'react';
import { postRequest } from './models';
import Player from './Player';


export default function EditTeam() {
  const [teamName, setTeamName] = useState("");
  const [playerName, setPlayerName] = useState("");

  const evalData = () => {
    const getData = async () => {
        const token = sessionStorage.getItem("token")
        const data = await postRequest("insert", {playername: playerName, teamname: teamName, token: token});
        console.log(data)
    }
    getData();
  }

  const deletePlayer = () => {
    const deleteData = async () => {
        const token = sessionStorage.getItem("token")
        const data = await postRequest("remove", {playername: playerName, teamname: teamName, token: token});
        console.log(data)
    }
    deleteData();
  }

  return (
    <div>
    <br></br>
    <br></br>
    <br></br>
    <br></br>
    <center>
    <h4>Insert Player</h4>
    <label for="inputTeam" class="sr-only">Team Name</label>
      <input type="text" id="inputTeam" class="form-control" placeholder="Team Name" style={{ width: '18rem' }} 
          onChange={e => setTeamName(e.target.value)} required autofocus/>
    <label for="inputPlayer" class="sr-only">Player Name</label>
      <input type="text" id="inputPlayer" class="form-control" placeholder="Player Name" style={{ width: '18rem' }} 
          onChange={e => setPlayerName(e.target.value)} required autofocus/>
    <button type="button" class="btn btn-success" onClick={evalData}>Insert</button>

    <br></br>
    <br></br>
    <br></br>
    <br></br>
    <h4>Delete Player</h4>
    <label for="inputTeam" class="sr-only">Team Name</label>
      <input type="text" id="inputTeam" class="form-control" placeholder="Team Name" style={{ width: '18rem' }} 
          onChange={e => setTeamName(e.target.value)} required autofocus/>
    <label for="inputPlayer" class="sr-only">Player Name</label>
      <input type="text" id="inputPlayer" class="form-control" placeholder="Player Name" style={{ width: '18rem' }} 
          onChange={e => setPlayerName(e.target.value)} required autofocus/>
    <button type="button" class="btn btn-danger" onClick={deletePlayer}>Delete</button>
    <Player></Player>
    </center>
    </div>
  )
}
