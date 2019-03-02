import { Loader } from "utils/redux";

import { User } from "./user";

export { User } from "./user";

export interface State {
  user: Loader<User>;
  logged: boolean;
}
