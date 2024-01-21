import { Injectable } from '@angular/core';
import { Observable, skip } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Workshop, WorkshopGetInterface } from '../models/mmm-workshop';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { environment } from '../../../../../apps/admin/src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class MmmWorkshopService {
  constructor(private http: HttpClient) {}

  get(queryParams: any): Observable<WorkshopGetInterface> {
    console.log("===workshop query",queryParams);
    
    let params = new HttpParams();
    // Adding query parameters to the HttpParams object
    if (queryParams.query.queryParams.pageSize) {
      params = params.append(
        'pageSize',
        queryParams.query.queryParams.pageSize
      );
    }
    if (queryParams.query.queryParams.pageSize) {
      params = params.append(
        'pageNumber',
        queryParams.query.queryParams.pageIndex
      );
    }
    if (queryParams.query.queryParams.searchText) {
      params = params.append(
        'searchText',
        queryParams.query.queryParams.searchText
      );
    }
    if (queryParams.query.queryParams.startDate) {
      params = params.append(
        'startDate',
        queryParams.query.queryParams.startDate
      );
    }
    if (queryParams.query.queryParams.endDate) {
      params = params.append('endDate', queryParams.query.queryParams.endDate);
    }
    if (queryParams.query.queryParams.sortBy) {
      params = params.append(
        'sortBy',
        queryParams.query.queryParams.sortBy
      );
    }
    if (queryParams.query.queryParams.isDescending) {
      params = params.append(
        'isDescending',
        queryParams.query.queryParams.isDescending
      );
    }

    return this.http.get<WorkshopGetInterface>(
      `${environment.apiUrl}Workshop`,
      { params }
    );
  }

  add(payload: Workshop) {
    return this.http.post(`${environment.apiUrl}Workshop`, payload);
  }

  update(payload: Workshop) {
    return this.http.put(
      `${environment.apiUrl}Workshop/${payload.id}`,
      payload
    );
  }

  getAllWorkshop()
  {
    return this.http.get(`${environment.apiUrl}Workshop/GetAllWorkshops`);
  }
}
// get(queryParams: any):Observable<ClientGetInterface>{
//   let params = new HttpParams();
//   // Adding query parameters to the HttpParams object
//   if (queryParams.query.queryParams.pageSize) {
//     params = params.append('pageSize', queryParams.query.queryParams.pageSize);
//   }
//   if (queryParams.query.queryParams.pageSize) {
//     params = params.append('pageNumber', queryParams.query.queryParams.pageIndex);
//     }
//     if (queryParams.query.queryParams.searchText) {
//       params = params.append('searchText', queryParams.query.queryParams.searchText);
//       }
//     return this.http.get<ClientGetInterface>(`https://localhost:5001/api/Client`, { params });
// }
