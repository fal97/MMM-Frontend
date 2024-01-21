import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import {  User } from '../models/user';
import { Observable } from 'rxjs';
import { ResetPasswordViewModel } from '../models/Common/reset-password-model';
import { UserRegister } from '../models/mmm-userregister';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { environment } from '../../../../../apps/admin/src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient) { }
  adminlogin(payload:User) :Observable<any>  {
    return this.http.post(`${environment.apiUrl}Auth/AdminLogin`,payload);
  }

  forgetPassword(email:string) :Observable<any>  {
    console.log("email",email);
    return this.http.post(`${environment.apiUrl}Auth/ForgetPassword/${email}`,null);
  }

  resetPassword(payload:ResetPasswordViewModel):Observable<any>{
    return this.http.post(`${environment.apiUrl}Auth/ResetPassword`,payload);
  }

  clientlogin(payload:User) :Observable<any>  {
    return this.http.post(`${environment.apiUrl}Auth/ClientLogin`,payload);
  }

  clientRegister(payload:UserRegister) :Observable<any>  {
    return this.http.post(`${environment.apiUrl}Auth/RegisterClient`,payload);
  }

}
