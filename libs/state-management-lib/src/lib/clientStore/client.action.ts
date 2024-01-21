import {createAction, props} from '@ngrx/store'
import {Client, ClientGetInterface} from '@frontend/data-access-lib'

export const LOAD_CLIENT = '[client] get client list';
export const LOAD_CLIENT_SUCCESS = '[client] get successful client list';
export const LOAD_CLIENT_FAIL = '[client] get fail client list';

export const CREATE_CLIENT = '[client] create client';
export const CREATE_CLIENT_SUCCESS = '[client] create client success';
export const CREATE_CLIENT_FAIL = '[client] create client fail';

export const UPDATE_CLIENT = '[client] update client';
export const UPDATE_CLIENT_SUCCESS = '[client] update client success'

export const APPROVE_CLIENT = '[client] approve client';
export const APPROVE_CLIENT_SUCCESS = '[client] approve client success'

export const RESET_CLIENT = '[client] reset'



export const loadclients = createAction(LOAD_CLIENT, props<{ queryParams: any }>());
export const loadclientssuccess = createAction(LOAD_CLIENT_SUCCESS, props<{clients: ClientGetInterface}>())
export const loadclientsfail = createAction(LOAD_CLIENT_FAIL, props<{errortext: any}>())

export const addclient = createAction(CREATE_CLIENT, props<{clientinput: any}>())
export const addclientsuccess = createAction(CREATE_CLIENT_SUCCESS, props<{clientSuccess: string, clientId: any}>())
export const addclientfail = createAction(CREATE_CLIENT_FAIL, props<{error: any}>())


export const updateclient = createAction(UPDATE_CLIENT, props<{clientinput: any}>())
export const updateclientsuccess = createAction(UPDATE_CLIENT_SUCCESS, props<{clientSuccess: string}>())

export const approveclient = createAction(APPROVE_CLIENT, props<{clientinput: any}>())
export const approveclientsuccess = createAction(APPROVE_CLIENT_SUCCESS, props<{clientSuccess: string}>())


export const resetclient = createAction(RESET_CLIENT)


