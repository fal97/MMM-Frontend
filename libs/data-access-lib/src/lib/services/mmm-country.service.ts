import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { environment } from '../../../../../apps/admin/src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MmmCountryService {

  constructor(private http:HttpClient) { }

  getCountryList() {
    return this.http.get(`${environment.apiUrl}Country`)
  }

}
