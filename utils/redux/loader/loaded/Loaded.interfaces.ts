import { LoaderModel } from "../loader/Loader.interfaces";

export interface LoadedModel<V> extends LoaderModel {
  value: V;
}