import React from "react";
import { I18nextProvider } from "react-i18next";
import { Provider as ReduxProvider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import { Router } from "components/ecosystems";
import { NoMatch, User } from "components/pages";
import { preloadNamespaces } from "core/i18n";

import { Props } from "./environment.interfaces";

import "bootstrap/dist/css/bootstrap.css";

export default class Environment extends React.Component<Props> {
  componentDidMount() {
    this.preload();
  }

  private preload() {
    preloadNamespaces();
  }

  private mainRoutes = [
    {
      path: "/user",
      component: User
    },
    {
      component: NoMatch
    }
  ];

  private mainRedirects = [
    {
      from: "/",
      exact: true,
      to: "/user"
    }
  ];

  renderRouter() {
    const { history } = this.props;

    return <Router history={history} routes={this.mainRoutes} redirects={this.mainRedirects} />;
  }

  render() {
    const { store, i18n, persistor } = this.props;
    const renderPage = () => this.renderRouter();

    return (
      <I18nextProvider i18n={i18n}>
        <ReduxProvider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            {renderPage}
          </PersistGate>
        </ReduxProvider>
      </I18nextProvider>
    );
  }
}
