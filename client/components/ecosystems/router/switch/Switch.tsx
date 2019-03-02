import React from "react";
import { Redirect, Route, Switch as ReactRouterSwitch } from "react-router-dom";

import { Props } from "./switch.interfaces";

const Switch: React.SFC<Props> = props => {
  const { routes = [], redirects = [] } = props;

  return (
    <ReactRouterSwitch>
      {redirects.map((redirect, index) => (
        <Redirect key={index} {...redirect} />
      ))}
      {routes.map((route, index) => (
        <Route key={index} {...route} />
      ))}
    </ReactRouterSwitch>
  );
};

export default Switch;
