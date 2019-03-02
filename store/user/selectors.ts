import { createSelector } from "reselect";

import { AppState } from "store";

const user = (state: AppState) => state.user.user;

const getUser = createSelector(user, data => data);

export default {
  getUser
};
