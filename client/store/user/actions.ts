import actionCreatorFactory from "typescript-fsa";

import { AjaxResponse } from "utils/redux";

import { UserData } from "./model";

const actionCreator = actionCreatorFactory("User");

export default {
  restore: actionCreator("RESTORE"),
  getUser: actionCreator.async<number, AjaxResponse<UserData>, string>("LOGIN")
};
