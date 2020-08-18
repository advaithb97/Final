import React, { useState, useEffect } from 'react';
import { postRequest } from './models';


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
    <input onChange={e => setTeamName(e.target.value)} placeholder="Enter a team name"/>
    <input onChange={e => setPlayerName(e.target.value)} placeholder="Enter a player name"/>
    <button onClick={evalData}>Insert</button>
    <br></br>
    <br></br>
    <input onChange={e => setTeamName(e.target.value)} placeholder="Enter a team name"/>
    <input onChange={e => setPlayerName(e.target.value)} placeholder="Enter a player name"/>
    <button onClick={deletePlayer}>Delete</button>
    </div>
  )
}
