import { ConnectedRouter } from "connected-react-router";
import React from "react";

import { Props } from "./router.interfaces";
import Switch from "./switch/Switch";

export default class Router extends React.PureComponent<Props> {
  render() {
    const { routes = [], redirects = [], history = null, children = null } = this.props;
    const routerSwitch = children ? children : <Switch redirects={redirects} routes={routes} />;

    return history ? (
      <ConnectedRouter history={history}>{routerSwitch}</ConnectedRouter>
    ) : (
      routerSwitch
    );
  }
}
