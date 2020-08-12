import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import Login from './Login';
import Signup from './Signup';
import Player from './Player';
import CreateTeam from './CreateTeam'
import EditTeam from './EditTeam'
import ShowTeam from './ShowTeam'

function Router ({ token, setToken }) {
  let boolval = true;
  if (token === null) { boolval = false; }
  return (
    <div>
      { boolval ? 
        <div>
          <Route path="/player" component={Player} />
          <Route path="/createTeam" component={CreateTeam} />
          <Route path="/editTeam" component={EditTeam} />
          <Route path="/showTeam" component={ShowTeam} />
        </div>
        :
        <div>
          <Route path="/login" >
            <Login setToken={setToken}/>
          </Route>
          <Route path="/signup" component={Signup} />
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