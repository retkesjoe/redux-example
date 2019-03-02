import { RouterState, connectRouter } from "connected-react-router";
import { History } from "history";
import { combineReducers } from "redux";
import { combineEpics } from "redux-observable";

import * as user from "./user";

export interface AppState {
  router: RouterState;
  user: user.State;
}

export const createRootReducer = (history: History) =>
  combineReducers<AppState>({
    router: connectRouter(history),
    user: user.reducer
  });

export const rootEpic = combineEpics(user.epics);
