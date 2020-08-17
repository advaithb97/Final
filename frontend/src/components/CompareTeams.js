import React, { useState } from 'react';
import { postRequest, playerScore } from './models';
import PlayerElem from './PlayerElem';

function compareTeams() {
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
  
  const [teamName2, setTeamName2] = useState('');
  const [team2, setTeam2] = useState([]);
  const [PTSarr2, setPTSarr2] = useState([]);
  const [TRBarr2, setTRBarr2] = useState([]);
  const [ASTarr2, setASTarr2] = useState([]);
  const [STLarr2, setSTLarr2] = useState([]);
  const [BLKarr2, setBLKarr2] = useState([]);

  const [winResult, setWinResult] = useState([]);

  const [playersArr, setPlayersArr] = useState([]);

  const [winTeam, setWinTeam] = useState("");
  const [lossTeam, setLossTeam] = useState("");


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
        const token = sessionStorage.getItem("token");
        const data = await postRequest("viewTeam", {teamname: teamName, token: token});
        console.log(data);
        setTeam(data['team']);
        setTeamOut(team.map((elemval) => <p key={elemval}>{elemval}</p>));
    }
    viewData();
  }

  const viewTeam2 = () => {
    const viewData = async () => {
        const token = sessionStorage.getItem("token");
        const data = await postRequest("viewTeam", {teamname: teamName2, token: token});
        console.log(data);
        setTeam2(data['team']);
        setTeamOut(team.map((elemval) => <p key={elemval}>{elemval}</p>));
    }
    viewData();
  }

  const comparisonFnc = async () => {
    const token = sessionStorage.getItem("token");
    const compareData = async () => {
        let totalscore1 = 0;
        let totalscore2 = 0;

        for (let i = 0; i < team.length; i++) {
            let PTS = team[i]['PTS'];
            let TRB = team[i]['TRB'];
            let AST = team[i]['AST'];
            let STL = team[i]['STL'];
            let BLK = team[i]['BLK'];
            let TOV = team[i]['TOV'];
            let TSpercent = team[i]['TS%'];
            let PTS2 = team2[i]['PTS'];
            let TRB2 = team2[i]['TRB'];
            let AST2 = team2[i]['AST'];
            let STL2 = team2[i]['STL'];
            let BLK2 = team2[i]['BLK'];
            let TOV2 = team2[i]['TOV'];
            let TSpercent2 = team2[i]['TS%'];
            let pScore1 = playerScore(PTS, TRB, AST, STL, BLK, TOV, TSpercent);
            let pScore2 = playerScore(PTS2, TRB2, AST2, STL2, BLK2, TOV2, TSpercent2);
            totalscore1 += pScore1;
            totalscore2 += pScore2;
        }
        if (totalscore1 > totalscore2) {
            setWinResult('team 1 wins');
            setWinTeam(teamName);
            setLossTeam(teamName2)
        } else if (totalscore1 < totalscore2) {
            setWinResult('team 2 wins');
            setWinTeam(teamName2);
            setLossTeam(teamName);
        } else {setWinResult('tie');}
    }
    compareData();
    const data = await postRequest("insert_result", {winteam: teamName, 
                    lossteam: teamName2, token: token});
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
    let copyArr = [];
    for (let i = 0; i < team.length; i++) {
      const name = team[i]['name']
      const PTS = team[i]['PTS']
      const AST = team[i]['AST']
      const TRB = team[i]['TRB']
      const STL = team[i]['STL']
      const BLK = team[i]['BLK']
      const x = <PlayerElem name={name} PTS={PTS} TRB={TRB} AST={AST} STL={STL} BLK={BLK}/>
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
      <input onChange={e => setTeamName(e.target.value)} placeholder="Enter first team to show"/>
      <button onClick={viewTeam}>Set Team1</button>
      <input onChange={e => setTeamName2(e.target.value)} placeholder="Enter second team to show"/>
      <button onClick={viewTeam2}>Set Team2</button>
      <button onClick={comparisonFnc}>Compare Teams</button>
      <br></br>
      {winResult}
      <br></br>
    </div>
  )
}

export default compareTeams;