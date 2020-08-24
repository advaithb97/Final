import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';


export default function NavBar({token}){
  console.log(typeof(token));
  console.log(token);
  let boolval = true;
  if (token === null || token === 'null') { 
    boolval = false;
  }
  console.log(boolval);
  return (
    <div>
      { boolval ? 
        <nav class="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
        <a class="navbar-brand" href="/">Home</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarCollapse">
          <ul class="navbar-nav mr-auto">
            <li class="nav-item active">
              <a class="nav-link" href="/editTeam">Edit Team<span class="sr-only">(current)</span></a>
            </li>
            <li class="nav-item active">
              <a class="nav-link" href="/player">Player<span class="sr-only">(current)</span></a>
            </li>
            <li class="nav-item active">
              <a class="nav-link" href="/createTeam">Create Team<span class="sr-only">(current)</span></a>
            </li>
            <li class="nav-item active">
              <a class="nav-link" href="/showTeam">Show Team<span class="sr-only">(current)</span></a>
            </li>
            <li class="nav-item active">
              <a class="nav-link" href="/compareTeams">Compare Teams<span class="sr-only">(current)</span></a>
            </li>
            <li class="nav-item active">
              <a class="nav-link" href="/votesPage">Votes<span class="sr-only">(current)</span></a>
            </li>
            <li class="nav-item active">
              <a class="nav-link" href="/friendsPage">Friends<span class="sr-only">(current)</span></a>
            </li>
            <li class="nav-item active">
              <a class="nav-link" href="/challengePage">Challenge<span class="sr-only">(current)</span></a>
            </li>
            <li class="nav-item active">
              <a class="nav-link" href="/logout">Logout<span class="sr-only">(current)</span></a>
            </li>
          </ul>
        </div>
      </nav>
        :
        <nav class="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
        <a class="navbar-brand" href="/">Home</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarCollapse">
          <ul class="navbar-nav mr-auto">
            <li class="nav-item active">
              <a class="nav-link" href="/login">Login<span class="sr-only">(current)</span></a>
            </li>
            <li class="nav-item active">
              <a class="nav-link" href="/signup">Signup<span class="sr-only">(current)</span></a>
            </li>
          </ul>
        </div>
      </nav>

        /**
        <nav>
        <Link style={{color: "pink"}} to="/login">Login</Link>
        <br></br>
        <Link style={{color: "pink"}} to="/signup">Signup</Link>
        </nav>*/
        /**<div>
        <Button variant="primary" href="/login">Login</Button>
        <Button variant="secondary" href="/signup">Signup</Button>
        </div>*/
      }
    </div>

    /** 
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
   */
  )
}