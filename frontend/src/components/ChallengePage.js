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
            console.log(data);
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
                console.log(x);
            }
            for (let i = 0; i < friendVals.length; i++) {
                const fname = friendVals[i];
                copyArr2.push(fname);
            }
            console.log(copyArr);
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

  const checkFnc = () => {
      const viewData = async () => {
        const token = sessionStorage.getItem("token");
        const data = await postRequest("showChallenges", {token: token});
        console.log(data);
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
  }


  return (
    <div>
    <br></br>
    <br></br>
    <br></br>
    <center>
    <h3>Friends: </h3>
    {friendsArr.map((elemval, index) => <div key={index}>{elemval}</div>)}
    <br></br>
    <br></br>
    <label for="inputName" class="sr-only">Name</label>
    <input type="Name" id="inputName" class="form-control" placeholder="Friend Name" style={{ width: '18rem' }} 
          onChange={e => setName(e.target.value)} required/>
    <label for="inputTeam" class="sr-only">Team Name</label>
      <input type="text" id="inputTeam" class="form-control" placeholder="Team Name" style={{ width: '18rem' }} 
          onChange={e => setTeamName(e.target.value)} required autofocus/>
    <button type="button" class="btn btn-danger" onClick={requestFnc}>Challenge Friend</button>
    <br></br>
    <br></br>
    {requestsArr.map((elemval, index) => <div key={index}>{elemval}</div>)}
    </center>
    </div>
  )
}

/**{requestsArr.map((elemval, index) => <div key={index}>{elemval}</div>)}*/