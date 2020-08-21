import React, { useState, useEffect } from 'react';
import { postRequest } from './models';
import ChallengeElem from './ChallengeElem';

export default function ChallengePage() {
    const [requestsArr, setRequestsArr] = useState([]);
    const [friendsArr, setFriendsArr] = useState([]);
    const [name, setName] = useState("");
    const [teamName, setTeamName] = useState("");

    useEffect(() => {
        const viewData = async () => {
            const token = sessionStorage.getItem("token");
            const data = await postRequest("showChallenges", {token: token});
            const requestVals = data['challenge requests'];
            const data2 = await postRequest("showFriends", {token: token});
            const friendVals = data2['friends'];
            let copyArr = [];
            let copyArr2 = [];
            for (let i = 0; i < requestVals.length; i++) {
                const friendname = requestVals[i]['friendname'];
                const friendTeamName = requestVals[i]['friendteamname'];
                const x = <ChallengeElem friendname={friendname} friendTeamName={friendTeamName}/>;
                copyArr.push(x);
            }
            for (let i = 0; i < friendVals.length; i++) {
                const fname = friendVals[i];
                copyArr2.push(fname);
            }
            console.log(copyArr2);
            setRequestsArr(copyArr);
            setFriendsArr(copyArr2);
        }
        viewData();
    }, [])

    const requestFnc = () => {
        const evalFnc = async () => {
          const token = sessionStorage.getItem("token");
          const data = await postRequest("challengeRequest", {friendname: name, teamname: teamName, token: token});
          console.log(data);
        }
        evalFnc();
    }


  return (
    <div>
    <br></br>
    <br></br>
    <br></br>
    <h3>Friends: </h3>
    {friendsArr.map((elemval, index) => <div key={index}>{elemval}</div>)}
    <br></br>
    <br></br>
    <input onChange={e => setName(e.target.value)} placeholder="Enter friend name"/>
    <input onChange={e => setTeamName(e.target.value)} placeholder="Enter team name"/>
    <button onClick={requestFnc}>Challenge Friend</button>
    <br></br>
    <br></br>
    {requestsArr.map((elemval, index) => <div key={index}>{elemval}</div>)}
    </div>
  )
}