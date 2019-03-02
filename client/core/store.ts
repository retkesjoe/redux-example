import { routerMiddleware } from "connected-react-router";
import { History } from "history";
import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension/developmentOnly";
import { EpicMiddleware, createEpicMiddleware } from "redux-observable";
import { persistReducer } from "redux-persist";
import createEncryptor from "redux-persist-transform-encrypt";
import storage from "redux-persist/lib/storage";
import { BehaviorSubject } from "rxjs";
import { switchMap } from "rxjs/operators";

import { createRootReducer, rootEpic } from "store";

class Store {
  history: History;
  epicMiddleware: EpicMiddleware<any>;
  epics: BehaviorSubject<typeof rootEpic>;

  constructor(history: History) {
    this.history = history;
    this.epicMiddleware = createEpicMiddleware();
    this.epics = new BehaviorSubject(rootEpic);
  }

  private getEnhancer() {
    return composeWithDevTools(
      applyMiddleware(routerMiddleware(this.history), this.epicMiddleware)
    );
  }

  getPersistedRootReducer() {
    const encryptor = createEncryptor({
      secretKey: process.env.PERSISTOR_ENCRYPTOR_KEY || "somesecretkey"
    });

    const persistConfig = {
      key: "root",
      storage,
      whitelist: ["persisted"],
      transforms: [encryptor]
    };

    const rootReducer = createRootReducer(this.history);
    return persistReducer(persistConfig, rootReducer);
  }

  getStore() {
    return createStore(this.getPersistedRootReducer(), this.getEnhancer());
  }

  getEpicMiddleware() {
    return this.epicMiddleware;
  }

  getHotReloadingEpic() {
    return (...args: any[]) => this.epics.pipe(switchMap((epic: any) => epic(...args)));
  }

  getEpics() {
    return this.epics;
  }
}

export default (history: History) => {
  const storeHelper = new Store(history);
  const store = storeHelper.getStore();
  const epicMiddleware = storeHelper.getEpicMiddleware();

  epicMiddleware.run(storeHelper.getHotReloadingEpic());

  if (module.hot) {
    module.hot.accept("store", () => {
      store.replaceReducer(storeHelper.getPersistedRootReducer());
      storeHelper.getEpics().next(rootEpic);
    });
  }

  return store;
};
