import actionCreatorFactory from "typescript-fsa";

import { AjaxResponse } from "utils/redux";

import { User } from "./model";

const actionCreator = actionCreatorFactory("Auth");

export default {
  login: actionCreator.async<undefined, AjaxResponse<User>, string>("LOGIN")
};
