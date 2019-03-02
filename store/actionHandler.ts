import { Action } from "redux";
import { ofType } from "redux-observable";

import { AjaxResponse } from "utils/redux";
import { Observable, catchError, filter, map, mergeMap, of, takeUntil } from "utils/rxjs";
import { AsyncActionCreators, ActionCreator } from "typescript-fsa";

/*
 * Check /client/store/:folder:/actions.ts for more info of the possible types!
 *
 * Generic types of abstractActionHandler:
 * - S is the type of AsyncActionCreators started response                                  | 'S'tarted response type
 * - ART is the type of AjaxResponse                                                        | 'A'jax'R'esponse'T'ype
 * - D extends from AjaxResponse<ART> is the type of AsyncActionCreators done response      | 'D'one response type
 * - F is the type of AsyncActionCreators failed response                                   | 'F'ailed response type
 * - T extends AsynActionCreators<S | undefined, D, F> is the type of actions.function()    | 'T'ype is the default generics name convention.
 *
 * Method arguments:
 * - The action$ type is an Observable<Action>
 * - The apiCall type is a function with an optional parameter
 *    set parameter if the api call method is POST, PUT and request body needed
 *    api call will be return data with type of Observable<D>
 * - The actionCall type is T
 *
 * If more than one parameter should be passed to the api call:
 * - Declare the first type as object in corresponding action of action.ts
 *  e.g: checkoutWithPaymentMethod: actionCreator.async<{ checkout: Checkout; method: string }, AjaxResponse<{}>,string>("CHECKOUT_WITH_PAYMENT_METHOD")
 * - And the same way in action
 *  e.g: postCheckoutWithPaymentMethod: (params: { checkout: Checkout; method: string }) => Http.post(`/my-memoq/cloud-server/modify/checkout/${params.method}`, params.checkout)
 */

export const ActionHandler = <
  S,
  ART,
  D extends AjaxResponse<ART>,
  F,
  T extends AsyncActionCreators<S | undefined, D, F>,
  R extends {[K: string]: ActionCreator<void>}
>(
  action$: Observable<Action>,
  apiCall: (opt?: S) => Observable<D>,
  actionCall: T,
  importedAction: R
) =>
  action$.pipe(
    filter(actionCall.started.match),
    mergeMap(action => {
      if (action.payload !== undefined) {
        return apiCall(action.payload).pipe(
          map(response => actionCall.done({ params: action.payload, result: response as D })),
          takeUntil(action$.pipe(ofType(importedAction.restore.type, actionCall.started.type))),
          catchError(error =>
            of(actionCall.failed({ params: action.payload, error: error.message }))
          )
        );
      }
      return apiCall().pipe(
        map(response => actionCall.done({ result: response as D })),
        takeUntil(action$.pipe(ofType(importedAction.restore.type, actionCall.started.type))),
        catchError(error => of(actionCall.failed({ error: error.message })))
      );
    })
  );