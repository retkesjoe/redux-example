import { LoaderStatus } from "..";

export interface LoaderModel {
  status: LoaderStatus;
  lastUpdated: number;
  statusCode: number;
  isLoading(): boolean;
  isLoaded(): boolean;
}

export abstract class Loader implements LoaderModel {
  status: LoaderStatus;
  lastUpdated: number;
  statusCode: number;

  protected constructor(status: LoaderStatus, statusCode: number = 0) {
    this.status = status;
    this.lastUpdated = new Date().getTime();
    this.statusCode = statusCode;
  }

  isLoading() {
    return this.status === LoaderStatus.Loading;
  }

  isLoaded() {
    return this.status === LoaderStatus.Loaded || this.status === LoaderStatus.Failed;
  }
}
