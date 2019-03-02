import { LoaderModel } from "../loader/Loader.interfaces";

export interface UnsentModel<V> extends LoaderModel {
  value?: V;
}
