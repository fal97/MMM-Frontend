import { Component , OnInit} from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import {  AuthService } from '@frontend/data-access-lib';


@Component({
  selector: 'frontend-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css'],
})

export class ForgetPasswordComponent implements OnInit {
  constructor(private fd: FormBuilder,
   private authService: AuthService,
   private router: Router,
   ) {}
   ngOnInit(): void {

   }
 forgetPasswordForm = this.fd.group({
   email: ['']
  })
  
  showErrorMsg = false;
  errorText="";
  isError = true;
  
  redirectToLogin() {
    this.router.navigate(['/']);
  }
  submit() {
     if(this.forgetPasswordForm.value.email !== "" || this.forgetPasswordForm.value.email !== "" ) {
       this.authService.forgetPassword((this.forgetPasswordForm.value.email as string)).subscribe((data)=> {
         if(data.isSuccess){
          this.isError = false;
          this.showErrorMsg = true;
          this.errorText = data.message;
          this.forgetPasswordForm.reset();
         }else{
          console.log("error",data);
          this.isError= true;
          this.showErrorMsg = true;
          this.errorText = data.message;
         }
      })}
    else{
      this.isError= true;
      this.showErrorMsg=true;
      this.errorText= "Enter a valid email";
    }
  }
}