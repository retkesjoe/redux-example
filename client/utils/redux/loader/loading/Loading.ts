import { LoaderStatus } from "..";
import { Loader } from "../loader/Loader";
import { LoadingModel } from "./Loading.interfaces";

export class Loading<V> extends Loader implements LoadingModel<V> {
  value?: V;

  constructor(value?: V) {
    const status = LoaderStatus.Loading;

    super(status);

    this.value = value;
  }
}
