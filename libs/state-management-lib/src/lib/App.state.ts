import { clientReducer } from "./clientStore/client.reducer";
import { countryReducer } from "./countryStore/country.reducer";
import { workshopReducer } from './workshopStore/workshop.reducer';

export const AppState = {
    client: clientReducer,
    country: countryReducer,
    workshop : workshopReducer
}