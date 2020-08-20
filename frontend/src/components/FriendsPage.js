import React, { useState, useEffect } from 'react';
import { postRequest } from './models';
import FriendElem from './FriendElem';


export default function FriendsPage() {
    const [requestsArr, setRequestsArr] = useState([]);
    const [friendsArr, setFriendsArr] = useState([]);
    const [name, setName] = useState("");

    useEffect(() => {
        const viewData = async () => {
            const token = sessionStorage.getItem("token");
            const data = await postRequest("showRequests", {token: token});
            const requestVals = data['friend requests'];
            const data2 = await postRequest("showFriends", {token: token});
            const friendVals = data2['friends'];
            let copyArr = [];
            let copyArr2 = [];
            for (let i = 0; i < requestVals.length; i++) {
                const friendname = requestVals[i];
                const x = <FriendElem friendname={friendname}/>;
                copyArr.push(x);
            }
            for (let i = 0; i < friendVals.length; i++) {
                const fname = friendVals[i];
                copyArr2.push(fname);
            }
            setRequestsArr(copyArr);
            setFriendsArr(copyArr2);
        }
        viewData();
    }, [])

    const requestFnc = () => {
        const evalFnc = async () => {
          const token = sessionStorage.getItem("token");
          const data = await postRequest("friendRequest", {friendname: name, token: token});
          console.log(data);
        }
        evalFnc();
    }

  return (
    <div>
    <br></br>
    <br></br>
    <br></br>
    <input onChange={e => setName(e.target.value)} placeholder="Enter a name"/>
    <button onClick={requestFnc}>Request Friend</button>
    <br></br>
    <br></br>
    <h3>Friends: </h3>
    {friendsArr.map((elemval, index) => <div key={index}>{elemval}</div>)}
    <br></br>
    <br></br>
    {requestsArr.map((elemval, index) => <div key={index}>{elemval}</div>)}
    </div>
  )
}