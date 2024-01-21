export interface Client {
    id: number,
    name: string,
    email: string,
    contactNumber: string,
    occupations?: string,
    streetAddress?: string,
    town?: string,
    state?: string,
    postCode?: string,
    country?: string,
    workshop?: string,
    isActive?: boolean,
    inviteStatus?:number,
    rejectionReason?: string,

  
} 

export interface ClientGetInterface{
    clientId: number,
    clients: Client[];
    items: Client[];
    pageNumber: number;
    totalPages: number;
    totalCount: number;
    hasPreviousPage: boolean;
    hasNextPage: boolean;
    errorMessage:string,
    successMessage: string,
    sortBy:string,
    isDescending:false
}