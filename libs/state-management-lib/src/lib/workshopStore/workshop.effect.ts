import { MmmWorkshopService, WorkshopGetInterface } from '@frontend/data-access-lib';
import {Actions, createEffect, ofType} from '@ngrx/effects'
import { GET_ALL_WORKSHOP, LOAD_WORKSHOP, addworkshop, addworkshopfail, addworkshopsuccess, getallworkshopsfail, getallworkshopsuccess, loadworkshopsfail, loadworkshopsuccess, updateworkshop, updateworkshopfail, updateworkshopsuccess } from './workshop.action';
import {EMPTY, catchError, exhaustMap, map, of, tap} from 'rxjs'
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { addclientfail } from '../clientStore/client.action';

@Injectable()
export class WorkshopEffects {
        
    
    constructor(private action$:Actions, private workshopService:MmmWorkshopService,private router: Router) {}
     
    _workshops$ = createEffect(() =>
    this.action$.pipe(
      ofType(LOAD_WORKSHOP),
      map((action: WorkshopGetInterface) => action),
      exhaustMap((action: WorkshopGetInterface) => {
        return this.workshopService.get({ query: action }).pipe(
          map((data) => {
             return loadworkshopsuccess({ workshops: data });
          }),
          catchError((_error) =>
            of(loadworkshopsfail({ errortext: _error.message }))
          )
        );
      })
    )
  );


    // _workshops =createEffect(() =>
    //   this.action$.pipe(
    //     ofType(LOAD_WORKSHOP),
    //     exhaustMap((action) => {
    //         return this.workshopService.get({ query: action }).pipe(
    //             map((data) => {
    //                 return loadworkshopsuccess({workshops: data})
    //             }),
    //             catchError((_error)=> of(loadworkshopsfail({errortext:_error.message})))
    //         )
    //     })
    //   )
    // );

    _addworkshop=createEffect(() =>
      this.action$.pipe(
        ofType(addworkshop),
        exhaustMap((action) => {
            return this.workshopService.add(action.workshopinput).pipe(
                map((data) => {
                    return addworkshopsuccess({workshopSuccess: "success",workshopId:data})
                }),
                tap(() => this.router.navigate(['/dashboard/workshopManagement'])),
                catchError((error) => {
                  // Assuming the error response from the API includes a 'message' property
                  
                  const errorMessage = error?.error?.message || 'An error occurred.';
                  return of(addworkshopfail({ error: errorMessage }));
                })
              );
            })
          )
        );


  
    _updateworkshop=createEffect(() =>
      this.action$.pipe(
        ofType(updateworkshop),
        exhaustMap((action) => {
            return this.workshopService.update(action.workshopinput).pipe(
                map((data) => {
                    return updateworkshopsuccess({workshopSuccess: "success"})
                }),
                tap(() => this.router.navigate(['/dashboard/workshopManagement'])),
                catchError((error) => {
                  // Assuming the error response from the API includes a 'message' property
                  const errorMessage = error?.error?.message || 'An error occurred.';
                  return of(updateworkshopfail({ error: errorMessage }));
                })
              );
            })
          )
        );

    _getallworkshop=createEffect(() =>
      this.action$.pipe(
        ofType(GET_ALL_WORKSHOP),
        exhaustMap((action) => {
            return this.workshopService.getAllWorkshop().pipe(
                map((data) => {
                  console.log("===== log data",data);
                  
                    return getallworkshopsuccess({allworkshop: data})
                }),
                catchError((_error)=> of(getallworkshopsfail({errortext:_error.message})))
            )
        })
      )
    );
}