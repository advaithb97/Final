import React, { useState, useEffect } from 'react';
import { postRequest } from './models';
import VoteElem from './VoteElem';


export default function votesPage() {
    const [votesArr, setVotesArr] = useState([]);

    useEffect(() => {
        const viewData = async () => {
            const token = sessionStorage.getItem("token");
            const data = await postRequest("viewVotes", {token: token});
            const voteVals = data['votes'];
            let copyArr = [];
            for (let i = 0; i < voteVals.length; i++) {
            const winTeam = voteVals[i]['winTeam'];
            const lossTeam = voteVals[i]['lossTeam'];
            const upVotes = voteVals[i]['upVotes'];
            const downVotes = voteVals[i]['downVotes'];
            const totalVal = upVotes + downVotes;
            let upval = 0;
            let downval = 0;
            if (totalVal > 0) {
              upval = 100 * upVotes/totalVal;
              downval = 100 * downVotes/totalVal;
            }
            const x = <VoteElem winTeam={winTeam} lossTeam={lossTeam} upvotes={upVotes} downvotes = {downVotes}
                upval={upval} downval={downval}/>
            copyArr.push(x);
            }
            setVotesArr(copyArr);
        }
        viewData();
    }, [])

  return (
    <div>
    <br></br>
    <br></br>
    <br></br>
    <br></br>
    {votesArr.map((elemval, index) => <div key={index}>{elemval}</div>)}
    </div>
  )
}
