import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IncomeExpense, IncomeExpenseGetInterface } from '../models/mmm-incomeExpense';
import { Observable } from 'rxjs';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { environment } from '../../../../../apps/admin/src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MmmIncomeExpenseService {

  constructor(private http:HttpClient) { }

  getIncomeExpense(queryParams: any): Observable<IncomeExpenseGetInterface> {

    console.log("===queryparams",queryParams);
    

    let params = new HttpParams();
    // Adding query parameters to the HttpParams object
    if (queryParams.pageSize) {
      params = params.append(
        'pageSize',
        queryParams.pageSize
      );
    }
    if (queryParams.pageSize) {
      params = params.append(
        'pageNumber',
        queryParams.pageIndex
      );
    }
    if (queryParams.TransactionType) {
      params = params.append(
        'TransactionType',
        queryParams.TransactionType
      );
    }
    if (queryParams.sortBy) {
      params = params.append(
        'sortBy',
        queryParams.sortBy
      );
    }
    if (queryParams.isDescending) {
      params = params.append(
        'isDescending',
        queryParams.isDescending
      );
    }
    if (queryParams.ClientId) {
      params = params.append(
        'ClientId',
        queryParams.ClientId
      );
    }
    

    return this.http.get<IncomeExpenseGetInterface>(
     `${environment.apiUrl}IncomeExpense`,
      { params }
    );
  }

  addInComeExpense(payload:IncomeExpense) {
    return this.http.post(`${environment.apiUrl}IncomeExpense`,payload);
  }

  updateInComeExpense(payload: IncomeExpense) {
    console.log("======update payload",payload);
      
    return this.http.put(
      `${environment.apiUrl}IncomeExpense/${payload.id}`,
      payload
    );
  }

  deleteIncomeExpense(id: number) {
    return this.http.delete(`${environment.apiUrl}IncomeExpense/DeleteIncomeExpense/${id}`);
  }

  uploadIncomeExpenseCsvFile(payload: FormData) {
    return this.http.post(`${environment.apiUrl}FileOperations/UploadIncomeExpenseCSV`, payload);
  }
}