import {createReducer, on } from "@ngrx/store";
import { initialState } from "./workshop.state";
import { addworkshop, addworkshopfail, addworkshopsuccess, getallworkshops, getallworkshopsfail, getallworkshopsuccess, loadworkshops, loadworkshopsfail, loadworkshopsuccess, resetworkshop, updateworkshop, updateworkshopfail, updateworkshopsuccess } from "./workshop.action";


const _workshopReducer = createReducer(
    initialState,
    on(loadworkshops, (state) => {
        return {
            ...state
        }
    }),
    on(loadworkshopsuccess, (state,action) => {
        const allWorkshopsIn = action.workshops.items;  
        return {
            ...state,
            items: allWorkshopsIn,
            pageNumber:  action.workshops.pageNumber,
            totalPages:  action.workshops.totalPages,
            totalCount:  action.workshops.totalCount,
            hasPreviousPage:  action.workshops.hasPreviousPage,
            hasNextPage:  action.workshops.hasNextPage,
            sortBy: action.workshops.sortBy,
            isDescending:action.workshops.isDescending
        }
    }),
    on(loadworkshopsfail, (state,action) => {
        return {
            ...state,
            workshops: [],
            errorMessage: action.errortext
        }
    }),
    on(addworkshop, (state,action) => {
        const _workshop={...action.workshopinput}
        return {
            ...state,
            workshops: [...state.workshops,_workshop]
        }
    }),
    on(addworkshopsuccess, (state,action) => {
        //const _workshop={...action.workshopinput}
        return {
            ...state,
            successMessage: action.workshopSuccess,
            workshopId:action.workshopId
        }
    }),
    on(addworkshopfail, (state,action) => {
        return {
            ...state,
            errorMessage: action.error
            
        }
    }),
    on(updateworkshop, (state,action) => {
        const _workshop={...action.workshopinput}
        const updateworkshop = state.workshops.map((workshop) => {
            return _workshop.id===workshop.id?_workshop:workshop
        })
        return {
            ...state,
            workshops: updateworkshop
        }
    }),
    on(updateworkshopsuccess, (state,action) => {
        return {
            ...state,
            successMessage: action.workshopSuccess
        }
    }),
    on(updateworkshopfail, (state,action) => {
        return {
            ...state,
            errorMessage: action.error
            
        }
    }),
    on(resetworkshop, (state) => {
        return {
            ...state,
            workshops: [],
            successMessage: "",
            errorMessage: ""
        }
    }),
    on(getallworkshops, (state) => {
        return {
            ...state
        }
    }),
    on(getallworkshopsuccess, (state,action) => {
        return {
            ...state,
            allWorkShop: [...action.allworkshop]
        }
    }),
    on(getallworkshopsfail, (state,action) => {
        return {
            ...state,
            allWorkShop: [],
            errorMessage: action.errortext
        }
    }),
)

export function workshopReducer(state: any, action: any) {
    return _workshopReducer(state, action);
  }