import React from "react";
import { useRouteMatch, Switch, Route } from "react-router-dom";
import LandingPage from "./LandingPage";
import RecipeDetail from "./RecipeDetail";
import CreateRecipeView from "./CreateRecipe";

function Cookbook() {
  let { path } = useRouteMatch();

  return (
    <div>
      <Switch>
        <Route path={`${path}/create`}>
          <CreateRecipeView />
        </Route>
        <Route path={`${path}/:recipeId`}>
          <RecipeDetail />
        </Route>
        <Route path={path}>
          <LandingPage />
        </Route>
      </Switch>
    </div>
  );
}

export default Cookbook;
