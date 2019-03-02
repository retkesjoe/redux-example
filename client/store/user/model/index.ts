import { Loader } from "utils/redux";

import { UserData } from "./user";

export { UserData } from "./user";

export interface State {
  user: Loader<UserData>;
}
