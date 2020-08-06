import React, { useState, useEffect } from 'react';
import { postRequest } from './models';


export default function CreateTeam() {
  const [teamName, setTeamName] = useState("");

  const evalData = () => {
    const getData = async () => {
        const token = sessionStorage.getItem("token")
        const data = await postRequest("newteam", {teamname: teamName, token: token});
        console.log(data)
    }
    getData();
  }

  return (
    <div>
    <input onChange={e => setTeamName(e.target.value)} placeholder="Enter a team name"/>
    <button onClick={evalData}>Create</button>
    </div>
  )
}
