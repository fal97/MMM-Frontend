import { Client } from "@frontend/data-access-lib";

  export interface ClientState {
     totalCount: any;
     clients:  Client[],
     clientId: any,
     errorMessage: string,
     successMessage: string,
     pageNumber: number,
     totalPages: number,
     hasPreviousPage: boolean,
     hasNextPage: boolean,
     sortBy:string,
     isDescending:boolean
 
  }

  export const initialState : ClientState = {
    clients: [],
    clientId: null,
    pageNumber: 0,
    totalPages: 0,
    totalCount: 0,
    hasPreviousPage: true,
    hasNextPage: true,
    errorMessage: '',
    successMessage: '',
    sortBy:'',
    isDescending:false
  }