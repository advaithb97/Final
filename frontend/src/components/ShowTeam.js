import React, { useState } from 'react';
import { postRequest } from './models';
import PlayerElem from './PlayerElem';
import ReactDOM from 'react-dom'

function showTeam() {
  const [teams, setTeams] = useState([]);
  const [output, setOutput] = useState([]);
  const [teamName, setTeamName] = useState("");
  const [team, setTeam] = useState([])
  const [teamOut, setTeamOut] = useState([]);
  const [PTSarr, setPTSarr] = useState([]);
  const [TRBarr, setTRBarr] = useState([]);
  const [ASTarr, setASTarr] = useState([]);
  const [STLarr, setSTLarr] = useState([]);
  const [BLKarr, setBLKarr] = useState([]);


  const getTeams = () => {
    const getData = async () => {
        const token = sessionStorage.getItem("token");
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
        console.log(team);
        let copyPTS = [];
        let copyTRB = [];
        let copyAST = [];
        let copySTL = [];
        let copyBLK = [];
        for (let i = 0; i < team.length; i++) {
            console.log(i);
            copyPTS.push(team[i]['PTS']);
            copyTRB.push(team[i]['TRB']);
            copyAST.push(team[i]['AST']);
            copySTL.push(team[i]['STL']);
            copyBLK.push(team[i]['BLK']);
        }
        console.log(copyPTS);
        setPTSarr(copyPTS);
        setTRBarr(copyTRB);
        setASTarr(copyAST);
        setSTLarr(copySTL);
        setBLKarr(copyBLK);
    }
    playerData();
  }

  const viewArrs = () => {
      console.log(PTSarr);
      console.log(TRBarr);
      console.log(ASTarr);
      console.log(STLarr);
      console.log(BLKarr);
  }

  const viewPlayers = () => {
    for (let i = 0; i < team.length; i++) {
      const PTS = team[i]['PTS']
      const AST = team[i]['AST']
      const TRB = team[i]['TRB']
      const STL = team[i]['STL']
      const BLK = team[i]['BLK']
      ReactDOM.render(<PlayerElem PTS={PTS} RB={TRB} AST={AST} STL={STL} BLK={BLK}/>);
    }
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
      <div>{PTSarr}</div>
      <button onClick={viewArrs}>Check out Arrs</button>
      <button onClick={viewPlayers}>Check out Players</button>
    </div>
  )
}

export default showTeam;