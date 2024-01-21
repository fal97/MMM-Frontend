import { Workshop } from "@frontend/data-access-lib";

  export interface WorkshopState {
     totalCount: any;
     workshops:  Workshop[],
     workshopId: any,
     errorMessage: string,
     successMessage: string,
     pageNumber: number,
     totalPages: number,
     hasPreviousPage: boolean,
     hasNextPage: boolean,
     sortBy:string,
     isDescending:boolean,
     allWorkShop: Workshop[]
  }

  export const initialState : WorkshopState = {
    workshops: [],
    pageNumber: 0,
    totalPages: 0,
    workshopId:null,
    totalCount: 0,
    hasPreviousPage: true,
    hasNextPage: true,
    errorMessage: '',
    successMessage: '',
    sortBy:'',
    isDescending:false,
    allWorkShop: []
  }

