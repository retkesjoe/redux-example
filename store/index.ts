import { combineReducers } from "redux";
import { combineEpics } from "redux-observable";

import * as user from "./user";


export interface AppState {
  user: user.State;
}

export const rootReducer = combineReducers<AppState>({
  user: user.reducer
});

export const rootEpic = combineEpics(
  user.epics
);
