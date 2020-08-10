import React from 'react';
import { Link } from 'react-router-dom';


export default function NavBar(token){
  return (
    /**
    <div>
      { token ? 
        <nav>
        <Link style={{color: "pink"}} to="/player">Player</Link>
        <br></br>
        <Link style={{color: "pink"}} to="/createTeam">Create Team</Link>
      </nav>
        :
        <nav>
        <Link style={{color: "pink"}} to="/login">Login</Link>
        <br></br>
        <Link style={{color: "pink"}} to="/signup">Signup</Link>
      </nav>
      }
    </div>
    */
   <div>
      <Link style={{color: "pink"}} to="/editTeam">Edit Team</Link>
      <br></br>
      <Link style={{color: "pink"}} to="/player">Player</Link>
      <br></br>
      <Link style={{color: "pink"}} to="/createTeam">Create Team</Link>
      <br></br>
      <Link style={{color: "pink"}} to="/showTeam">Show Team</Link>
      <br></br>
      <Link style={{color: "pink"}} to="/login">Login</Link>
      <br></br>
      <Link style={{color: "pink"}} to="/signup">Signup</Link>
   </div>
  )
}