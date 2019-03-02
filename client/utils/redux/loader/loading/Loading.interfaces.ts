import { LoaderModel } from "../loader/Loader.interfaces";

export interface LoadingModel<V> extends LoaderModel {
  value?: V;
}
