import { ClientGetInterface, MmmClientService } from '@frontend/data-access-lib';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  LOAD_CLIENT,
  addclient,
  addclientfail,
  addclientsuccess,
  approveclient,
  approveclientsuccess,
  loadclientsfail,
  loadclientssuccess,
  updateclient,
  updateclientsuccess,
} from './client.action';
import { EMPTY, catchError, exhaustMap, map, mergeMap, of, tap } from 'rxjs';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable()
export class ClientEffects {
  constructor(
    private action$: Actions,
    private clientService: MmmClientService,
    private router: Router
  ) {}

  _clients$ = createEffect(() =>
    this.action$.pipe(
      ofType(LOAD_CLIENT),
      map((action: ClientGetInterface) => action),
      exhaustMap((action: ClientGetInterface) => {
        return this.clientService.get({ query: action }).pipe(
          map((data) => {
            console.log("data in reducer",data);
            return loadclientssuccess({ clients: data });
          }),
          catchError((_error) =>
            of(loadclientsfail({ errortext: _error.message }))
          )
        );
      })
    )
  );

  // old
  // _clients=createEffect(() =>
  //   this.action$.pipe(
  //     ofType(LOAD_CLIENT),
  //     exhaustMap((action) => {
  //         return this.clientService.get({query: action}).pipe(
  //             map((data) => {
  //                 return loadclientssuccess({clients: data})
  //             }),
  //             catchError((_error)=> of(loadclientsfail({errortext:_error.message})))
  //         )
  //     })
  //   )
  // );
  
    _addclient=createEffect(() =>
      this.action$.pipe(
        ofType(addclient),
        exhaustMap((action) => {
            return this.clientService.add(action.clientinput).pipe(
                map((data) => {
                    return addclientsuccess({clientSuccess: "success", clientId: data})
                }),
                tap(() => this.router.navigate(['/dashboard/clientManagement'])),
                catchError((_error)=> of(addclientfail({error:"client already exists for the given email"})))
            )
        })
      )
    );

  
    _updateclient=createEffect(() =>
      this.action$.pipe(
        ofType(updateclient),
        exhaustMap((action) => {
            return this.clientService.update(action.clientinput).pipe(
                map((data) => {
                    return updateclientsuccess({clientSuccess: "success"})
                }),
                tap(() => this.router.navigate(['/dashboard/clientManagement'])),
                catchError((_error)=> of(loadclientsfail({errortext:_error.message})))
            )
        })
      )
    );

    _approveclient=createEffect(() =>
      this.action$.pipe(
        ofType(approveclient),
        exhaustMap((action) => {
            return this.clientService.approve(action.clientinput).pipe(
                map((data) => {
                    return approveclientsuccess({clientSuccess: "success"})
                }),
                tap(() => this.router.navigate(['/dashboard/clientManagement'])),
                catchError((_error)=> of(loadclientsfail({errortext:_error.message})))
            )
        })
      )
    );
}
