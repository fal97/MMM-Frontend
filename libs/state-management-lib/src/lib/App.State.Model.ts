import { ClientState } from "./clientStore/client.state";
import { CountryState } from "./countryStore/country.state";
import { WorkshopState } from "./workshopStore/workshop.state";

export interface AppStateModel {
    client: ClientState,
    country: CountryState,
    workshop : WorkshopState
}