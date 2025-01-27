import React, { useState } from 'react';
import { postRequest, playerScore } from './models';
import PlayerElem from './PlayerElem';
import DoublePlayer from './DoublePlayer';

function compareTeams() {
  const [nonEmpty, setNonEmpty] = useState(false);
  const [teams, setTeams] = useState([]);
  const [output, setOutput] = useState([]);
  const [teamName, setTeamName] = useState("");
  const [team, setTeam] = useState([])
  const [teamOut, setTeamOut] = useState([]);
  
  const [teamName2, setTeamName2] = useState('');
  const [team2, setTeam2] = useState([]);


  const [winResult, setWinResult] = useState("");

  const [playersArr, setPlayersArr] = useState([]);

  const [winTeam, setWinTeam] = useState("");
  const [lossTeam, setLossTeam] = useState("");

  const [score1, setScore1] = useState(0);
  const [score2, setScore2] = useState(0);


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
    const data = await postRequest("viewTeam", {teamname: teamName, token: token});
    const team = data['team'];
    console.log(team);
    const dataX = await postRequest("viewTeam", {teamname: teamName2, token: token});
    const team2 = dataX['team'];
    console.log(team2);
    viewAll(team, team2);
    let totalscore1 = 0;
    let totalscore2 = 0;
    let win = teamName;
    let loss = teamName2;
    const compareData = async () => {
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
            setWinResult(teamName + ' wins');
            setWinTeam(teamName);
            setLossTeam(teamName2);
        } else if (totalscore1 < totalscore2) {
            setWinResult(teamName2 + ' wins');
            setWinTeam(teamName2);
            setLossTeam(teamName);
            win = teamName2;
            loss = teamName;
        } else {setWinResult('tie');}
    }
    compareData();
    console.log(totalscore1);
    setScore1(totalscore1);
    console.log(totalscore2);
    setScore2(totalscore2);
    const data2 = await postRequest("insert_result", {winteam: win, 
                    lossteam: loss, token: token});
  }


  const viewAll = async (team, team2) => {
    let copyArr = [];
    for (let i = 0; i < team.length; i++) {
      const name = team[i]['name']
      const PTS = team[i]['PTS']
      const AST = team[i]['AST']
      const TRB = team[i]['TRB']
      const STL = team[i]['STL']
      const BLK = team[i]['BLK']
      const imgurl = team[i]['imgurl']
      const tm = team[i]['TM']
      const name2 = team2[i]['name']
      const PTS2 = team2[i]['PTS']
      const AST2 = team2[i]['AST']
      const TRB2 = team2[i]['TRB']
      const STL2 = team2[i]['STL']
      const BLK2 = team2[i]['BLK']
      const imgurl2 = team2[i]['imgurl']
      const tm2 = team2[i]['TM']
      const x = <div>
      <DoublePlayer name={name} PTS={PTS} TRB={TRB} AST={AST} STL={STL} BLK={BLK} imgurl={imgurl} team={tm}
         name2={name2} PTS2={PTS2} TRB2={TRB2} AST2={AST2} STL2={STL2} BLK2={BLK2} imgurl2={imgurl2} team2={tm2}   />
      </div>
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

      <label for="inputTeam" class="sr-only">Team Name</label>
      <input type="text" id="inputTeam" class="form-control" placeholder="Team 1" style={{ width: '18rem' }} 
          onChange={e => setTeamName(e.target.value)} required autofocus/>
      <label for="inputTeam2" class="sr-only">Team Name 2</label>
      <input type="text" id="inputTeam2" class="form-control" placeholder="Team 2" style={{ width: '18rem' }} 
          onChange={e => setTeamName2(e.target.value)} required autofocus/>
          
      <button type="button" class="btn btn-dark" onClick={comparisonFnc}>Compare Teams</button>
      <br></br>
      {winResult}
      <p>{teamName} Score: {score1}, {teamName2} Score: {score2}</p>
      <br></br>
      {playersArr.map((elemval, index) => <div key={index}>{elemval}</div>)}
      </center>
    </div>
  )
}

export default compareTeams;