import { LoaderStatus } from "..";
import { Loader } from "../loader/Loader";

export class Failed<E, V> extends Loader implements Failed<E, V> {
  error: E;
  value?: V;

  constructor(error: E, value?: V) {
    const status = LoaderStatus.Failed;

    super(status);

    this.value = value;
    this.error = error;
  }
}
