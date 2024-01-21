import { createFeatureSelector, createSelector } from "@ngrx/store";
import { CountryState } from "./country.state";



const getcountrystate = createFeatureSelector<CountryState>('country');


export const getcountry = createSelector(getcountrystate, (state) => {
    return state.country
})