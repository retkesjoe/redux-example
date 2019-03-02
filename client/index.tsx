import createBrowserHistory from "history/createBrowserHistory";
import React from "react";
import { render } from "react-dom";
import { persistStore } from "redux-persist";

import { Environment } from "components/environment";
import i18n from "core/i18n";
import configureStore from "core/store";

const applicationContext = process.env.APP_CONTEXT;

const history = createBrowserHistory({ basename: applicationContext });
const store = configureStore(history);
const root = document.querySelector("#root");
const persistor = persistStore(store);

render(<Environment history={history} store={store} persistor={persistor} i18n={i18n} />, root);
