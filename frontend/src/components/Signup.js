import React, { useState, useEffect } from 'react';
import { postRequest } from './models';


export default function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const evalData = () => {
      const getData = async () => {
        const data = await postRequest("create", {username: username, password: password});
        sessionStorage.setItem("token", data.session_id);
        console.log(data)
      }
      getData();
  }

  return (
    <div>
    <input onChange={e => setUsername(e.target.value)} placeholder="Enter a username"/>
    <input onChange={e => setPassword(e.target.value)} placeholder="Enter a password"/>
    <button onClick={evalData}>Add</button>
    </div>
  )
}