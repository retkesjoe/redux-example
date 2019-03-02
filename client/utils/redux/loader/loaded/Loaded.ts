import { AjaxResponse } from "utils/redux";

import { LoaderStatus } from "..";
import { Loader } from "../loader/Loader";
import { LoadedModel } from "./Loaded.interfaces";

export class Loaded<V> extends Loader implements LoadedModel<V> {
  value: V;

  constructor(response: AjaxResponse<V>) {
    const status = LoaderStatus.Loaded;

    super(status, response.status);

    this.value = response.response;
  }
}
