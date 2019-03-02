import { Action } from "redux";
import { combineEpics } from "redux-observable";

import { Observable } from "utils/rxjs";

import { ActionHandler } from "../actionHandler";
import actions from "./actions";
import api from "./api";

const getUser = (action$: Observable<Action>) =>
  ActionHandler(action$, api.getUser, actions.getUser, actions);

export default combineEpics(getUser);
