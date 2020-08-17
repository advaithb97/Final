import React, { useState } from 'react';
import { postRequest } from './models';
import PlayerElem from './PlayerElem';

function showTeam() {
  const [teams, setTeams] = useState([]);
  const [output, setOutput] = useState([]);
  const [teamName, setTeamName] = useState("");
  const [team, setTeam] = useState([])
  const [teamOut, setTeamOut] = useState([]);
  const [nameArr, setNameArr] = useState([]);
  const [PTSarr, setPTSarr] = useState([]);
  const [TRBarr, setTRBarr] = useState([]);
  const [ASTarr, setASTarr] = useState([]);
  const [STLarr, setSTLarr] = useState([]);
  const [BLKarr, setBLKarr] = useState([]);
  const [colorArr, setColorarr] = useState([]);
  const [imgArr, setImgArr] = useState([]);

  const [playersArr, setPlayersArr] = useState([]);


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

  const viewInfo = () => {
    const playerData = async () => {
        console.log(team);
        let copyPTS = [];
        let copyTRB = [];
        let copyAST = [];
        let copySTL = [];
        let copyBLK = [];
        let copyNames = [];
        for (let i = 0; i < team.length; i++) {
            console.log(i);
            copyNames.push(team[i]['name']);
            copyPTS.push(team[i]['PTS']);
            copyTRB.push(team[i]['TRB']);
            copyAST.push(team[i]['AST']);
            copySTL.push(team[i]['STL']);
            copyBLK.push(team[i]['BLK']);
        }
        console.log(copyPTS);
        setNameArr(copyNames);
        setPTSarr(copyPTS);
        setTRBarr(copyTRB);
        setASTarr(copyAST);
        setSTLarr(copySTL);
        setBLKarr(copyBLK);
    }
    playerData();
  }

  const viewArrs = () => {
      console.log(nameArr);
      console.log(PTSarr);
      console.log(TRBarr);
      console.log(ASTarr);
      console.log(STLarr);
      console.log(BLKarr);
  }

  const viewPlayers = async () => {
    await viewTeam();
    let copyArr = [];
    for (let i = 0; i < team.length; i++) {
      const name = team[i]['name']
      const PTS = team[i]['PTS']
      const AST = team[i]['AST']
      const TRB = team[i]['TRB']
      const STL = team[i]['STL']
      const BLK = team[i]['BLK']
      const color = team[i]['color']
      const imgurl = team[i]['imgurl']
      const tm = team[i]['TM']
      const x = <PlayerElem name={name} PTS={PTS} TRB={TRB} AST={AST} 
            STL={STL} BLK={BLK} color={color} imgurl={imgurl} team = {tm}/>
      copyArr.push(x);
    }
    setPlayersArr(copyArr);
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
      <button onClick={viewPlayers}>Check out Players</button>
      {playersArr.map((elemval, index) => <div key={index}>{elemval}</div>)}
    </div>
  )
}

export default showTeam;