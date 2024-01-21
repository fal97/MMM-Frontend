import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { MmmClientService, MmmCountryService } from "@frontend/data-access-lib";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import {EMPTY, catchError, exhaustMap, map, of, tap} from 'rxjs'
import { LOAD_COUNTRY, loadcountriesfail, loadcountriessuccess } from "./country.action";
import { loadclientssuccess } from "../clientStore/client.action";



@Injectable()
export class CountryEffects {


    constructor(private action$:Actions, private countryService:MmmCountryService,private router: Router) {}

    _countries=createEffect(() =>
      this.action$.pipe(
        ofType(LOAD_COUNTRY),
        exhaustMap((action) => {
            return this.countryService.getCountryList().pipe(
                map((data) => {
                    return loadcountriessuccess({countries: data})
                }),
                catchError((_error)=> of(loadcountriesfail({errortext:_error.message})))
            )
        })
      )
    );
}