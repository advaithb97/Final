import React, { useState } from 'react';
import { postRequest } from './models';
import PlayerElem from './PlayerElem';

function showTeam() {
  const [teams, setTeams] = useState([]);
  const [output, setOutput] = useState([]);
  const [teamName, setTeamName] = useState("");
  const [team, setTeam] = useState([])
  const [teamOut, setTeamOut] = useState([]);

  const [playersArr, setPlayersArr] = useState([]);
  const [nonEmpty, setNonEmpty] = useState(false);


  const getTeams = () => {
    const getData = async () => {
        const token = sessionStorage.getItem("token");
        const data = await postRequest("myTeams", {token: token});
        const teamvals = data['teams'];
        console.log(teamvals);
        setTeams(teamvals);
        setNonEmpty(true);
        setOutput(teamvals.map((elemval) => <p key={elemval}>{elemval}</p>));
    }
    getData();
  }

  const viewTeam = async () => {
    const viewData = async () => {
        const token = sessionStorage.getItem("token");
        const data = await postRequest("viewTeam", {teamname: teamName, token: token});
        console.log(data);
        setTeam(data['team']);
        setTeamOut(team.map((elemval) => <p key={elemval}>{elemval}</p>));
    }
    await viewData();
  }

  const viewPlayers = async () => {
    await viewTeam();
    let copyArr = [];
    for (let i = 0; i < team.length; i++) {
      const name = team[i]['name'];
      const PTS = team[i]['PTS'];
      const AST = team[i]['AST'];
      const TRB = team[i]['TRB'];
      const STL = team[i]['STL'];
      const BLK = team[i]['BLK'];
      const color = team[i]['color'];
      const imgurl = team[i]['imgurl'];
      const tm = team[i]['TM'];
      const TOV = team[i]['TOV'];
      const x = <PlayerElem name={name} PTS={PTS} TRB={TRB} AST={AST} 
            STL={STL} BLK={BLK} color={color} imgurl={imgurl} team={tm} TOV={TOV}/>
      copyArr.push(x);
    }
    setPlayersArr(copyArr);
  }

  return (
    <div>
    <br></br>
    <br></br>
    <br></br>
    <br></br>
      <button onClick={getTeams}>List Teams</button>
      { nonEmpty && <h3>Teams: </h3> }
      <div>{output}</div>
      <br></br>
      <br></br>
      <input onChange={e => setTeamName(e.target.value)} placeholder="Enter team to show"/>
      <button onClick={viewTeam}>ViewTeam</button>
      <br></br>
      <button onClick={viewPlayers}>Check out Players</button>
      {playersArr.map((elemval, index) => <div key={index}>{elemval}</div>)}
    </div>
  )
}

export default showTeam;