import React, { useState, useEffect } from 'react';
import { postRequest } from './models';
import { ProgressBar } from 'react-bootstrap';


export default function VoteElem({winTeam, lossTeam, upvotes, downvotes, upval, downval}) {
  const [upVotes, setUpVotes] = useState(upvotes);
  const [downVotes, setDownVotes] = useState(downvotes);
  const [upVal, setUpVal] = useState(upval);
  const [downVal, setDownVal] = useState(downval);

  useEffect(() => {
    const setupData = async () => {
        console.log(upVal);
        console.log(downVal);
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
        const totalVal = upVotes + downVotes;
        const updateUp = 100 * upVotes/totalVal;
        const updateDown = 100 * downVotes/totalVal;
        setUpVal(updateUp);
        setDownVal(updateDown);
      }
      evalUp();
  }

  const downVote = () => {
    const evalDown = async () => {
      const token = sessionStorage.getItem("token");
      const data = await postRequest("downvote", {downvotes: downvotes, winteam: winTeam, lossteam: lossTeam, token: token});
      console.log(data);
      setDownVotes(data['downvotes']);
      const totalVal = upVotes + downVotes;
      const updateUp = 100 * upVotes/totalVal;
      const updateDown = 100 * downVotes/totalVal;
      setUpVal(updateUp);
      setDownVal(updateDown);
    }
    evalDown();
}

  return (
    <div>
    <p>{winTeam} beats {lossTeam} Upvotes: {upVotes} Downvotes: {downVotes} <button onClick={upVote}>Upvote</button> <button onClick={downVote}>Downvote</button> </p>
      <ProgressBar>
      <ProgressBar variant="success" label={`${upVotes} up`} now={upVal} key={1} />
      <ProgressBar variant="danger" label={`${downVotes} down`} now={downVal} key={2} />
      </ProgressBar>
      <br></br>
      <br></br>
      <br></br>
    </div>
  )
}