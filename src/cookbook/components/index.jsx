import React from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import LandingPage from "./LandingPage";
import RecipeDetail from "./RecipeDetail";
import CreateRecipe from "./CreateRecipe";
import {
  GuestUser,
  AdminUser,
  Authorisation,
  admin_role,
  guest_role,
  userInGroups,
} from "../../components/Authorization";
import { useSelector } from "react-redux";
import UserPermissions from "../../components/UserPermissions";

function Cookbook() {
  let { path } = useRouteMatch();

  return (
    <div>
      <Switch>
        <Route path={`${path}/create`} component={CreateRecipe} />
        <Route path={`${path}/:recipeId`} component={RecipeDetail} />
        <Route path={path}>
          <LandingPage />
        </Route>
      </Switch>
    </div>
  );
}

export default Cookbook;
