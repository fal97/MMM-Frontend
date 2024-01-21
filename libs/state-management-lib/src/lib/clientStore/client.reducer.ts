import {createReducer, on } from "@ngrx/store";
import { initialState } from "./client.state";
import { addclient, addclientfail, addclientsuccess, approveclient, approveclientsuccess, loadclients, loadclientsfail, loadclientssuccess, resetclient, updateclient, updateclientsuccess } from "./client.action";
import { Client, ClientGetInterface } from "@frontend/data-access-lib";
 
// export const initialStat: ClientGetInterface = {
//     clients:  [],
//     pageNumber: 0,
//     totalPages: 0,
//     totalCount: 0,
//     hasPreviousPage: true,
//     hasNextPage: true,
//     errorMessage: '',
//     successMessage: '',
   
//   };
  
const _clientReducer = createReducer(
    initialState,
        on(loadclients, (state) => {
        return {
            ...state
        }
    }),
    on(loadclientssuccess, (state, action) => {
        const allClientsIn = action.clients.items;  
        return {
          ...state,
          items: allClientsIn,
          pageNumber:  action.clients.pageNumber,
          totalPages:  action.clients.totalPages,
          totalCount:  action.clients.totalCount,
          hasPreviousPage:  action.clients.hasPreviousPage,
          hasNextPage:  action.clients.hasNextPage,
          sortBy : action.clients.sortBy,
          isDescending:action.clients.isDescending      

        };
       }),
    on(addclient, (state,action) => {
        const _client={...action.clientinput}
        return {
            ...state,
            clients: [...state.clients,_client],
        }
    }),
    on(addclientsuccess, (state,action) => {
        //const _client={...action.clientinput}
        return {
            ...state,
            successMessage: action.clientSuccess,
            clientId: action.clientId
            
        }
    }),
    on(addclientfail, (state,action) => {
        //const _client={...action.clientinput}
        return {
            ...state,
            errorMessage: action.error
            
        }
    }),
    on(updateclient, (state,action) => {
        const _client={...action.clientinput}
        const updateclient = state.clients.map((client) => {
            return _client.id===client.id?_client:client
        })
        return {
            ...state,
            clients: updateclient
        }
    }),
    on(updateclientsuccess, (state,action) => {
        return {
            ...state,
            successMessage: action.clientSuccess
        }
    }),

    on(approveclient, (state,action) => {
        const _client={...action.clientinput}
        const approveclient = state.clients.map((client) => {
            return _client.id===client.id?_client:client
        })
        return {
            ...state,
            clients: approveclient
        }
    }),
    on(approveclientsuccess, (state,action) => {
        return {
            ...state,
            successMessage: action.clientSuccess
        }
    }),
    on(resetclient, (state) => {
        return {
            ...state,
            clients: [],
            successMessage: "",
            errorMessage: ""
        }
    })
)

export function clientReducer(state: any, action: any) {
    return _clientReducer(state, action);
  }