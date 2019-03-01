import { AjaxResponse } from "utils/redux";

import { Failed } from "./failed/Failed";
import { FailedModel } from "./failed/Failed.interfaces";
import { Loaded } from "./loaded/Loaded";
import { LoadedModel } from "./loaded/Loaded.interfaces";
import { Loading } from "./loading/Loading";
import { LoadingModel } from "./loading/Loading.interfaces";
import { Unsent } from "./unsent/Unsent";
import { UnsentModel } from "./unsent/Unsent.interfaces";

export const enum LoaderStatus {
  Unsent = "unsent",
  Loading = "loading",
  Failed = "failed",
  Loaded = "loaded"
}

export type Loader<V, E = string> =
  | UnsentModel<V>
  | LoadingModel<V>
  | LoadedModel<V>
  | FailedModel<E, V>;

export const unsent = <V>(value?: V): UnsentModel<V> => new Unsent<V>(value);
export const loading = <V>(value?: V): LoadingModel<V> => new Loading<V>(value);
export const loaded = <V>(response: AjaxResponse<V>): LoadedModel<V> => new Loaded<V>(response);
export const failed = <V, E = string>(error: E, value?: V): FailedModel<E, V> =>
  new Failed<E, V>(error, value);
