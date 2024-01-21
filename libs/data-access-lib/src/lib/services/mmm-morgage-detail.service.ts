import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MogageDetail } from '../models/mmm-morgageDetail';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { environment } from '../../../../../apps/admin/src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class MmmMorgageDetailService {

  constructor(private http:HttpClient) { }

  addMorgageDetail(payload:any) {
    console.log("====payload more",payload);
    
    return this.http.post(`${environment.apiUrl}MorgateDetails`,payload);
  }

  getMorgageById(morgageId: number) {
    return this.http.get(
      `${environment.apiUrl}MorgateDetails/getMorgateById/${morgageId}`
    );
  }

  // updateInComeExpense(payload: MogageDetail) {
  //   console.log("======update payload",payload);
      
  //   return this.http.put(
  //     `https://localhost:5001/api/IncomeExpense/${payload.id}`,
  //     payload
  //   );
  // }
}
