import React, { useState, useEffect } from 'react';
import { postRequest } from './models';
import ChallengeCompare from './ChallengeCompare';



export default function ChallengeElem({friendname, friendTeamName}) {
  const [teamName, setTeamName] = useState("");
  const [isAccepted, setIsAccepted] = useState(false);
  const [chall, setChall] = useState([]);

  const challengeFnc = () => {
    const evalChallenge = async () => {
      const token = sessionStorage.getItem("token");
      const data = await postRequest("confirmChallenge", {teamname: teamName, friendname: friendname, friendteam: friendTeamName, token: token});
      const team1 = data['team1'];
      const team2 = data['team2'];
      console.log(team1);
      console.log(team2);
      const x = <ChallengeCompare team={team1} team2={team2} teamName={teamName} teamName2={friendTeamName}/>
      setChall(x);
      console.log(x);
      const datax = await postRequest("deleteChallenge", {friendname: friendname, friendteam: friendTeamName, token: token});
    }
    evalChallenge();
}

  const evalFnc = () => {
    const evalData = async () => {
      const token = sessionStorage.getItem("token");
      const data = await postRequest("deleteChallenge", {friendname: friendname, friendteam: friendTeamName, token: token});
    }
    evalData();
}


  /**
  const confirm = () => {
      const evalUp = async () => {
        const token = sessionStorage.getItem("token");
        const data = await postRequest("confirmChallenge", {teamname:teamName, friendname: friendname, friendteamname: friendteamName, token: token});
      }
      evalUp();
  }

  const reject = () => {
    const evalDown = async () => {
      const token = sessionStorage.getItem("token");
      const data = await postRequest("rejectChallenge", {friendname: friendname, friendteam: friendteam, token: token});
    }
    evalDown();
}*/

  return (
    <div>
      <p>{friendname}, {friendTeamName}</p>
      <input onChange={e => setTeamName(e.target.value)} placeholder="Enter team"/>
      <button onClick={challengeFnc}>Accept Challenge</button>
      <button onClick={evalFnc}>Reject Challenge</button>
      {chall}
      <br></br>
    </div>)

  /**return (
    <div>
      <p>{friendname}  <button onClick={setIsAccepted(true)}>Accept Challenge</button>  <button onClick={evalFnc}>Reject Challenge</button></p>
      { isAccepted && <div><input onChange={e => setTeamName(e.target.value)} placeholder="Enter team"/>
            <button onClick={evalFnc, challengeFnc}></button></div> }
      <br></br>
    </div>
  )*/
}