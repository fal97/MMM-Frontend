import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../../apps/admin/src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class MmmStrategyService {

  constructor(private http:HttpClient) { }

  getStratergyList() {
    return this.http.get(`${environment.apiUrl}Strategy`)
  }
}
