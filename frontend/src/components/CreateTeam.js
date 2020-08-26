import React, { useState, useEffect } from 'react';
import { postRequest } from './models';


export default function CreateTeam() {
  const [teamName, setTeamName] = useState("");
  const [playerName, setPlayerName] = useState("");
  const [teamExisting, setTeamExisting] = useState(false);
  const [successTeam, setSuccessTeam] = useState(false);
  const [playerInvalid, setPlayerInvalid] = useState(false);
  const [playerExisting, setPlayerExisting] = useState(false);
  const [insertSuccess, setInsertSuccess] = useState(false);

  const evalData = () => {
    const getData = async () => {
        const token = sessionStorage.getItem("token")
        const data = await postRequest("newteam", {teamname: teamName, token: token});
        if (data['error'] === 'you already have this team') {
          setTeamExisting(true);
          setSuccessTeam(false);
        } else {
          setTeamExisting(false);
          setSuccessTeam(true);
        }
        console.log(data);
    }
    getData();
  }

  const addPlayer = () => {
    const addData = async () => {
        const token = sessionStorage.getItem("token")
        const data = await postRequest("insert", {playername: playerName, teamname: teamName, token: token});
        console.log(data);
        if (data['error'] === 'invalid player') {
          setPlayerExisting(false);
          setInsertSuccess(false);
          setPlayerInvalid(true);
        } else if (data['error'] === 'you already have this player on this team') {
          setPlayerExisting(true);
          setInsertSuccess(false);
          setPlayerInvalid(false);
        } else {
          setPlayerExisting(false);
          setInsertSuccess(true);
          setPlayerInvalid(false);
        }
    }
    addData();
  }

  return (
    <div>
    <br></br>
    <br></br>
    <br></br>
    <center>
    <h4>Create Team</h4>
    <label for="inputTeam" class="sr-only">Team Name</label>
      <input type="text" id="inputTeam" class="form-control" placeholder="Team Name" style={{ width: '18rem' }} 
          onChange={e => setTeamName(e.target.value)} required autofocus/>
    <button type="button" class="btn btn-dark" onClick={evalData}>Create</button>
    { teamExisting && <p>You already have this team</p> }
    { successTeam && <p>Team Successfully Added</p> }
    <br></br>
    <br></br>
    <label for="inputPlayer" class="sr-only">Player Name</label>
      <input type="text" id="inputPlayer" class="form-control" placeholder="Player Name" style={{ width: '18rem' }} 
          onChange={e => setPlayerName(e.target.value)} required autofocus/>
    <button type="button" class="btn btn-secondary" onClick={addPlayer}>Insert</button>
    {playerExisting && <p>You already have this player</p>}
    {playerInvalid && <p>Invalid Player</p>}
    {insertSuccess && <p>Successfully Added Player</p>}
    </center>
    </div>
  )
}
