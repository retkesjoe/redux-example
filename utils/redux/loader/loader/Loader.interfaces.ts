import { LoaderStatus } from "..";

export interface LoaderModel {
  status: LoaderStatus;
  lastUpdated: number;
  statusCode: number;
  isLoading(): boolean;
  isLoaded(): boolean;
}