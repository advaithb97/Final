import React, { useState } from 'react';
import { postRequest } from './models';

function showTeam() {
  const [teams, setTeams] = useState([]);
  const [output, setOutput] = useState([]);
  const [teamName, setTeamName] = useState("");
  const [team, setTeam] = useState([])
  const [teamOut, setTeamOut] = useState([]);
  const [pointsArr, setPointsArr] = useState([]);


  const getTeams = () => {
    const getData = async () => {
        const token = sessionStorage.getItem("token")
        const data = await postRequest("myTeams", {token: token});
        const teamvals = data['teams'];
        console.log(teamvals);
        setTeams(teamvals);
        setOutput(teamvals.map((elemval) => <p key={elemval}>{elemval}</p>));
    }
    getData();
  }

  const viewTeam = () => {
    const viewData = async () => {
        const token = sessionStorage.getItem("token")
        const data = await postRequest("viewTeam", {teamname: teamName, token: token});
        console.log(data);
        setTeam(data['team']);
        setTeamOut(team.map((elemval) => <p key={elemval}>{elemval}</p>));
    }
    viewData();
  }

  const viewInfo = () => {
    const playerData = async () => {
        console.log(team)
        let copyArr = [...pointsArr];
        for (let i = 0; i < team.length; i++) {
            console.log(i);
            let pts = team[i]['PTS'];
            console.log(pts)
            copyArr.push(pts);
            console.log(copyArr);
        }
        setPointsArr([...copyArr]);
    }
    playerData();
    console.log(pointsArr);
  }

  return (
    <div>
      <button onClick={getTeams}>List Teams</button>
      <p>teams: {teams}</p>
      <div>{output}</div>
      <br></br>
      <br></br>
      <input onChange={e => setTeamName(e.target.value)} placeholder="Enter team to show"/>
      <button onClick={viewTeam}>ViewTeam</button>
      <br></br>
      <br></br>
      <button onClick={viewInfo}>Check out Info</button>
      <div>{pointsArr}</div>
    </div>
  )
}

export default showTeam;