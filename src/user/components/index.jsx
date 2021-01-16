import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import CreateUser from './CreateUser';
import UserDetail from './UserDetail';
import UserList from './UserList';
import SignUp from './SignUp';
import { getData } from '../../utilities';
import { FETCH_USERS_URL } from '../../constants';


function User() {
  let {path} = useRouteMatch();

  const fetchData = async () => {
    return await getData(FETCH_USERS_URL);
  };

  return (
    <div>
      <Switch>
        <Route exact path={`${path}/create_user`}>
          <CreateUser/>
        </Route>
        <Route path={`/users/signup/`}>
          <SignUp/>
        </Route>
        <Route path={`${path}/:userId/`}>
          <UserDetail/>
        </Route>
        <Route exact path={path}>
          <UserList fetchData={fetchData}/>
        </Route>
      </Switch>
    </div>
  );
}

export default User;
