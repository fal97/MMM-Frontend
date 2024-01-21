import { Injectable } from '@angular/core';
import { Observable, skip } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Client, ClientGetInterface } from '../models/mmm-client';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { environment } from '../../../../../apps/admin/src/environments/environment';


@Injectable({
  providedIn: 'root',
})
export class MmmClientService {
  constructor(private http: HttpClient) {}


  get(queryParams: any): Observable<ClientGetInterface> {
    const params = new HttpParams()
      .set('pageSize', queryParams.query.queryParams.pageSize)
      .set('pageNumber', queryParams.query.queryParams.pageIndex)
      .set('searchText', queryParams.query.queryParams.searchText)
      .set('inviteStatus', queryParams.query.queryParams.inviteStatus)
      .set('sortBy', queryParams.query.queryParams.sortBy)
      .set('isDescending', queryParams.query.queryParams.isDescending)
    return this.http.get<ClientGetInterface>(
      `${environment.apiUrl}Client`,
      { params }
    );
  }

  add(payload: Client) {
    return this.http.post(`${environment.apiUrl}Client`, payload);
  }


  update(payload: Client) {
    console.log('=======payload', payload);

    return this.http.put(
      `${environment.apiUrl}Client/${payload.id}`,
      payload
    );
  }

  approve(payload: Client) {
    return this.http.put(
      `${environment.apiUrl}Client/Approve/${payload.id}`,
      payload
    );
  }

  // login(payload:User) {
  //   return this.http.post('https://localhost:5001/api/Auth/Login',payload);
  // }
  requestAccount(payload: any) {
    console.log('======payload', payload);

    return this.http.post(
      `${environment.apiUrl}Client/RequestAccount`,
      payload
    );
  }

  reInvite(queryParams: any) {
    return this.http.post(
      `${environment.apiUrl}Client/ReInvite/${queryParams}`,
      queryParams
    );
  }

  getClientById(clientId: number) {
    return this.http.get(
      `${environment.apiUrl}Client/getClientById/${clientId}`
    );
  }

  getClientDashboardData(clientId: number):Observable<any> {
    return this.http.get(
      `${environment.apiUrl}Client/getClientDashboardData/${clientId}`
    );
  }

  updateOnBoardStatus(payload:any)
  {
    console.log("=====payload",payload);
    
    return this.http.put(
      `${environment.apiUrl}Client/OnBoardingChange/${payload.id}`,
      payload
    );
  }
}
