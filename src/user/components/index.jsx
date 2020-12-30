import React from 'react';
import { useRouteMatch, Switch, Route } from 'react-router-dom';
import CreateUser from './CreateUser';
import UserDetail from './UserDetail';
import UserList from './UserList';


function User() {
  let {path} = useRouteMatch();

  return (
    <div>
      <Switch>
        <Route exact path={`${path}/create_user`}>
          <CreateUser/>
        </Route>
        <Route path={`${path}/:userId/`}>
          <UserDetail />
        </Route>
        <Route exact path={path}>
          <UserList/>
        </Route>
      </Switch>
    </div>
  );
}

export default User;
