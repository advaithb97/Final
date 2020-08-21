import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import Login from './Login';
import Signup from './Signup';
import Player from './Player';
import CreateTeam from './CreateTeam';
import EditTeam from './EditTeam';
import ShowTeam from './ShowTeam';
import CompareTeams from './CompareTeams';
import VotesPage from './VotesPage';
import FriendsPage from './FriendsPage';
import ChallengePage from './ChallengePage';
import Home from './Home';

function Router ({ token, setToken }) {
  let boolval = true;
  /**if (token === null) { boolval = false; }*/
  if (token === null || token === 'null') { 
    boolval = false;
  }
  return (
    <div>
      { boolval ? 
        <div>
          <Route exact path="/" component={Home}/>
          <Route exact path="/player" component={Player} />
          <Route exact path="/createTeam" component={CreateTeam} />
          <Route exact path="/editTeam" component={EditTeam} />
          <Route exact path="/showTeam" component={ShowTeam} />
          <Route exact path="/compareTeams" component={CompareTeams} />
          <Route exact path="/votesPage" component={VotesPage} />
          <Route exact path="/friendsPage" component={FriendsPage} />
          <Route exact path="/challengePage" component={ChallengePage} />
        </div>
        :
        <div>
          <Route exact path="/" component={Home}/>
          <Route exact path="/login" >
            <Login setToken={setToken}/>
          </Route>
          <Route exact path="/signup" component={Signup} />
        </div>
      }
    </div>


    /**
   < div>
      <Route path="/player" component={Player} />
      <Route path="/createTeam" component={CreateTeam} />
      <Route path="/editTeam" component={EditTeam} />
      <Route path="/showTeam" component={ShowTeam} />
      <Route path="/login" >
      <Login setToken={setToken}/>
      </Route>
      <Route path="/signup" component={Signup} />
    </div>
  */
  )
}

export default Router;