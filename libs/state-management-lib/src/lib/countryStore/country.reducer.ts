import { createReducer, on } from "@ngrx/store";
import { initialState } from "./country.state";
import { loadcountries, loadcountriesfail, loadcountriessuccess } from "./country.action";



const _countryReducer = createReducer(
    initialState,
    on(loadcountries, (state) => {
        return {
            ...state
        }
    }),
    on(loadcountriessuccess, (state,action) => {
        return {
            ...state,
            country: [...action.countries]
        }
    }),
    on(loadcountriesfail, (state,action) => {
        return {
            ...state,
            country: [],
            errorMessage: action.errortext
        }
    }),
    
)

export function countryReducer(state: any, action: any) {
    return _countryReducer(state, action);
  }