import { Workshop, WorkshopGetInterface } from "@frontend/data-access-lib";
import { createFeatureSelector, createSelector } from "@ngrx/store";
import {  WorkshopState } from "./workshop.state";


const getworkshopstate = createFeatureSelector<WorkshopGetInterface>('workshop');

export const getworkshop = createSelector(getworkshopstate, (state) => {
    return state.items
})

export const getworkshopbyid = (workshopId: number) => createSelector(getworkshopstate, (state) => {
    return state.items.find((workshop: Workshop) => workshop.id === workshopId) as Workshop
})

export const getworkshopinfo = createSelector(getworkshopstate, (state) => {
    return state
})
