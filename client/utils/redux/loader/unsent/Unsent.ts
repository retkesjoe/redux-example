import { LoaderStatus } from "..";
import { Loader } from "../loader/Loader";
import { UnsentModel } from "./Unsent.interfaces";

export class Unsent<V> extends Loader implements UnsentModel<V> {
  value?: V;

  constructor(value?: V) {
    const status = LoaderStatus.Unsent;

    super(status);

    this.value = value;
  }
}
