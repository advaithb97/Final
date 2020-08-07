import React, { useState, useEffect } from 'react';
import { postRequest } from './models';


export default function CreateTeam() {
  const [teamName, setTeamName] = useState("");
  const [playerName, setPlayerName] = useState("");


  const evalData = () => {
    const getData = async () => {
        const token = sessionStorage.getItem("token")
        const data = await postRequest("newteam", {teamname: teamName, token: token});
        console.log(data)
    }
    getData();
  }

  const addPlayer = () => {
    const addData = async () => {
        const token = sessionStorage.getItem("token")
        const data = await postRequest("insert", {playername: playerName, teamname: teamName, token: token});
        console.log(data)
    }
    addData();
  }

  return (
    <div>
    <input onChange={e => setTeamName(e.target.value)} placeholder="Enter a team name"/>
    <button onClick={evalData}>Create</button>
    <br></br>
    <br></br>
    <input onChange={e => setPlayerName(e.target.value)} placeholder="Enter a player to insert"/>
    <button onClick={addPlayer}>Insert</button>
    
    </div>
  )
}
