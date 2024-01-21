import { Client, ClientGetInterface } from "@frontend/data-access-lib";
import { createFeatureSelector, createSelector } from "@ngrx/store";
import { ClientState } from "./client.state";

const getclientstate = createFeatureSelector<ClientGetInterface>('client');

export const getclient = createSelector(getclientstate, (state) => {
    return state.items
})

export const getclientbyid = (clientId: number) => createSelector(getclientstate, (state) => {
    return state.items.find((client: Client) => client.id === clientId) as Client
})

export const getclientinfo = createSelector(getclientstate, (state) => {
    return state
})