import React, { useState, useEffect } from 'react';
import { postRequest, playerScore } from './models';
import DoublePlayer from './DoublePlayer';

function challengeCompare({teamName, team, teamName2, team2}) {
  const [winResult, setWinResult] = useState("");
  const [playersArr, setPlayersArr] = useState([]);
  const [winTeam, setWinTeam] = useState("");
  const [lossTeam, setLossTeam] = useState("");
  
  useEffect(() => {
    const evalData = async () => {
        console.log(teamName);
        console.log(teamName2);
        console.log(team);
        console.log(team2);
    }
    evalData();
  }, [])

  const viewAll = async () => {
    console.log(team);
    console.log(team2);
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

  const comparisonFnc = async () => {
    const token = sessionStorage.getItem("token");
    console.log(team);
    console.log(team2);
    viewAll();
    let totalscore1 = 0;
    let totalscore2 = 0;
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
    console.log(totalscore1);
    console.log(totalscore2);
  }

  return (
    <div>
      <br></br>
      <br></br>
      <button onClick={comparisonFnc}>Compare Teams</button>
      <br></br>
      {winResult}
      <br></br>
      {playersArr.map((elemval, index) => <div key={index}>{elemval}</div>)}
    </div>
  )
}

export default challengeCompare;