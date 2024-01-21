import {createAction, props} from '@ngrx/store'
import {Workshop, WorkshopGetInterface} from '@frontend/data-access-lib'

export const LOAD_WORKSHOP = '[workshop] get workshop list';
export const LORD_WORKSHOP_SUCCESS = '[workshop] get successful workshop list';
export const LOAD_WORKSHOP_FAIL = '[workshop] get fail workshop list';

export const GET_ALL_WORKSHOP = '[workshop] get all workshop list';
export const GET_ALL_WORKSHOP_SUCCESS = '[workshop] get all successful workshop  list';
export const GET_ALL_WORKSHOP_FAIL = '[workshop] get all fail workshop list';



export const CREATE_WORKSHOP = '[workshop] create workshop';
export const CREATE_WORKSHOP_SUCCESS = '[workshop] create workshop success';
export const CREATE_WORKSHOP_FAIL = '[workshop] create workshop fail';

export const UPDATE_WORKSHOP = '[workshop] update workshop';
export const UPDATE_WORKSHOP_SUCCESS = '[workshop] update workshop success'
export const UPDATE_WORKSHOP_FAIL = '[workshop] update workshop fail'

export const RESET_WORKSHOP = '[workshop] reset'



export const loadworkshops = createAction(LOAD_WORKSHOP, props<{ queryParams: any }>());
export const loadworkshopsuccess = createAction(LORD_WORKSHOP_SUCCESS, props<{workshops: WorkshopGetInterface}>())
export const loadworkshopsfail = createAction(LOAD_WORKSHOP_FAIL, props<{errortext: any}>())

export const getallworkshops = createAction(GET_ALL_WORKSHOP);
export const getallworkshopsuccess = createAction(GET_ALL_WORKSHOP_SUCCESS, props<{allworkshop: any}>())
export const getallworkshopsfail = createAction(GET_ALL_WORKSHOP_FAIL, props<{errortext: any}>())

export const addworkshop = createAction(CREATE_WORKSHOP, props<{workshopinput: any}>())
export const addworkshopsuccess = createAction(CREATE_WORKSHOP_SUCCESS, props<{workshopSuccess: string,workshopId: any}>())
export const addworkshopfail = createAction(CREATE_WORKSHOP_FAIL, props<{error: any}>())

export const updateworkshop = createAction(UPDATE_WORKSHOP, props<{workshopinput: any}>())
export const updateworkshopsuccess = createAction(UPDATE_WORKSHOP_SUCCESS, props<{workshopSuccess: string}>())
export const updateworkshopfail = createAction(UPDATE_WORKSHOP_FAIL, props<{error: any}>())


export const resetworkshop = createAction(RESET_WORKSHOP)


