export interface Workshop {
    id: number,
    name: string,
    offering: string,
    startDate: string,
    endDate: string,
    isActive: boolean,
  
  
} 


export interface WorkshopGetInterface{
    workshopId:number;
    items: Workshop[];
    pageNumber: number;
    totalPages: number;
    totalCount: number;
    hasPreviousPage: boolean;
    hasNextPage: boolean;
    errorMessage:string,
    successMessage: string,
    sortBy:string,
    isDescending:boolean,
    allWorkShop: Workshop[]

}