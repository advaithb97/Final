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

  const seePlayers = async () => {
    const token = sessionStorage.getItem("token");
    const data = await postRequest("viewTeam", {teamname: teamName, token: token});
    console.log(data);
    const team = data['team'];
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
    <center>
      <button type="button" class="btn btn-info" onClick={getTeams}>List Teams</button>
      { nonEmpty && <h3>Teams: </h3> }
      <div>{output}</div>
      <br></br>
      <br></br>
      <label for="inputTeam" class="sr-only">Team Name</label>
      <input type="text" id="inputTeam" class="form-control" placeholder="Team Name" style={{ width: '18rem' }} 
          onChange={e => setTeamName(e.target.value)} required autofocus/>      
      <button type="button" class="btn btn-primary" onClick={seePlayers}>Check Out Players</button>
      {playersArr.map((elemval, index) => <div key={index}>{elemval}</div>)}
    </center>
    </div>
  )
}
/**<button onClick={viewTeam}>ViewTeam</button> */
export default showTeam;