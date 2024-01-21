import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { environment } from '../../../../../apps/admin/src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class MmmAdminService {
  constructor(private http: HttpClient) {}


  getAdminDashboardData(): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}Admin/getAdminDashboardData`);
  }
}
