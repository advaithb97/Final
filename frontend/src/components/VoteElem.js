import React, { useState, useEffect } from 'react';
import { postRequest } from './models';


export default function VoteElem({winTeam, lossTeam, upvotes, downvotes}) {
  const [upVotes, setUpVotes] = useState(upvotes);
  const [downVotes, setDownVotes] = useState(downvotes);

  useEffect(() => {
    const setupData = async () => {
        console.log("upvotes" + upVotes);
        console.log("downvotes" + downVotes);
        setUpVotes(upvotes);
        setDownVotes(downvotes);
    }
    setupData();
  }, [])

  const upVote = () => {
      const evalUp = async () => {
        const token = sessionStorage.getItem("token");
        const data = await postRequest("upvote", {upvotes: upvotes, winteam: winTeam, lossteam: lossTeam, token: token});
        console.log(data);
        setUpVotes(data['upvotes']);
      }
      evalUp();
  }

  const downVote = () => {
    const evalDown = async () => {
      const token = sessionStorage.getItem("token");
      const data = await postRequest("downvote", {downvotes: downvotes, winteam: winTeam, lossteam: lossTeam, token: token});
      console.log(data);
      setDownVotes(data['downvotes']);
    }
    evalDown();
}

  return (
    <div>
    <p>{winTeam} beats {lossTeam} Upvotes: {upVotes} Downvotes: {downVotes}</p>
    <button onClick={upVote}>Upvote</button>
    <button onClick={downVote}>Downvote</button>
    </div>
  )
}