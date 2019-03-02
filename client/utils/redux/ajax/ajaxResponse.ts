import { AjaxResponse as RxjsAjaxResponse } from "rxjs/ajax";

import { convertToClient } from "utils/redux";

export interface AjaxResponse<T> extends RxjsAjaxResponse {
  response: T;
}

export const ajaxResponse = <T>(response: RxjsAjaxResponse): AjaxResponse<T> => ({
  ...response,
  response: convertToClient(response.response)
});
