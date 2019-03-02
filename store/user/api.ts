import Http from "utils/Http";

import {
  User
} from "./model";

export default {
  getUser: (params: {id: number}) => Http.get<User>(`/users/${params.id}`)
};
