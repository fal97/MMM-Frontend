import { Country } from "@frontend/data-access-lib";
import { createAction, props } from "@ngrx/store";


export const LOAD_COUNTRY = '[country] get country list';
export const LOAD_COUNTRY_SUCCESS = '[country] get successful country list';
export const LOAD_COUNTRY_FAIL = '[country] get fail country list';

export const loadcountries = createAction(LOAD_COUNTRY)
export const loadcountriessuccess = createAction(LOAD_COUNTRY_SUCCESS, props<{countries: any}>())
export const loadcountriesfail = createAction(LOAD_COUNTRY_FAIL, props<{errortext: any}>())