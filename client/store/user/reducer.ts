import { reducerWithInitialState } from "typescript-fsa-reducers";

import { failed, loaded, loading, unsent } from "utils/redux";

import actions from "./actions";
import { State } from "./model";

const initialState: State = {
  user: unsent()
};

const reducer = reducerWithInitialState<State>(initialState);

reducer
  .case(actions.getUser.started, state => ({
    ...state,
    user: loading()
  }))
  .case(actions.getUser.done, (state, payload) => ({
    ...state,
    user: loaded(payload.result)
  }))
  .case(actions.getUser.failed, (state, payload) => ({
    ...state,
    user: failed(payload.error)
  }));

export default reducer;
