import React, { useState, useEffect } from 'react';
import { postRequest } from './models';


export default function FriendElem({friendname}) {

  const accept = () => {
      const evalUp = async () => {
        const token = sessionStorage.getItem("token");
        const data = await postRequest("acceptFriend", {friendname: friendname, token: token});
      }
      evalUp();
  }

  const reject = () => {
    const evalDown = async () => {
      const token = sessionStorage.getItem("token");
      const data = await postRequest("rejectFriend", {friendname: friendname, token: token});
    }
    evalDown();
}

  return (
    <div>
      <p>{friendname}  <button onClick={accept}>Accept Friend</button>  <button onClick={reject}>Reject Friend</button></p>
      <br></br>
    </div>
  )
}