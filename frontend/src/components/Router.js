import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import Login from './Login';
import Signup from './Signup';
import Player from './Player';
import CreateTeam from './CreateTeam'

function Router ({ token, setToken }) {
  return (
    /** 
    <div>
      { token ? 
        <div>
          <Route path="/player" component={Player} />
          <Route path="/createTeam" component={CreateTeam} />
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
    */
   < div>
      <Route path="/player" component={Player} />
      <Route path="/createTeam" component={CreateTeam} />
      <Route path="/login" >
      <Login setToken={setToken}/>
      </Route>
      <Route path="/signup" component={Signup} />
    </div>
  )
}

export default Router;