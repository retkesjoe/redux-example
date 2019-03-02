import { ajaxResponse } from "utils/redux";
import { ajax, map } from "utils/rxjs";

const getUrl = (url: string) => `https://reqres.in/api/${url}`;

export default class Http {
  static get<R>(url: string, headers?: object) {
    return ajax({
      method: "GET",
      url: getUrl(url),
      crossDomain: true,
      withCredentials: false,
      headers: {
        ...headers,
        "Content-Type": "application/json"
      }
    }).pipe(map(response => ajaxResponse<R>(response)));
  }
  static post<R>(url: string, body?: any, headers?: object) {
    return ajax({
      method: "POST",
      url: getUrl(url),
      withCredentials: true,
      headers: {
        ...headers,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    }).pipe(map(response => ajaxResponse<R>(response)));
  }
  static put<R>(url: string, body?: any, headers?: object) {
    return ajax({
      method: "PUT",
      url: getUrl(url),
      withCredentials: true,
      crossDomain: true,
      headers: {
        ...headers,
        "Content-Type": "application/json"
      },
      body
    }).pipe(map(response => ajaxResponse<R>(response)));
  }
  static delete<R>(url: string, headers?: object) {
    return ajax({
      method: "DELETE",
      url: getUrl(url),
      withCredentials: true,
      headers: {
        ...headers,
        "Content-Type": "application/json"
      }
    }).pipe(map(response => ajaxResponse<R>(response)));
  }
}
