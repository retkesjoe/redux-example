import { LoaderModel } from "../loader/Loader.interfaces";

export interface FailedModel<E, V> extends LoaderModel {
  error: E;
  value?: V;
}