import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { Dashboard, Profile } from "../pages";

const Routes = () => {
  return (
    <Switch>
      <Route exact path={`/`} component={Dashboard} />
      <Route exact path='/dashboard' component={Dashboard} />


      <Route path="/dashboard/profile" component={Profile} />
      {/* <Route exact path="*" to="/dashboard/profile" component={Profile} /> */}
      {/* <Route render={() => <Redirect to={{ pathname: "/" }} />} /> */}
    </Switch>
  );
};

export default Routes;
