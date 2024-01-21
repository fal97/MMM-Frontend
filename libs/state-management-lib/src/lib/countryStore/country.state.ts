import { Country } from '@frontend/data-access-lib';

export interface CountryState {
  country: Country[];
  errorMessage: string;
}

export const initialState: CountryState = {
  country: [],
  errorMessage: '',
};
