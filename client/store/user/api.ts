import Http from "utils/Http";

import { UserData } from "./model";

export default {
  getUser: (id: number) => Http.get<UserData>(`users/${id}`)
};
