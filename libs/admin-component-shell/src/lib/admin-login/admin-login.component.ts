import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import {  User ,AuthService } from '@frontend/data-access-lib';

@Component({
  selector: 'frontend-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css'],
})


export class AdminLoginComponent implements OnInit {
   constructor(private fd: FormBuilder,
    private authService: AuthService,
    private router: Router,
    ) {}
    ngOnInit(): void {
      //Redirecting to the dashboard if the client is already logged in
      const token = localStorage.getItem('token'); 
      if(token){
        this.router.navigate(['/dashboard']);
      }
    }
  loginForm = this.fd.group({
    email: [''],
    password: [''],
   })
   
   showErrorMsg = false;
   errorText=""
   
   redirectToForgetPassword() {
    this.router.navigate(['/forgetPassword']);
  }
 
   submit() {
      if(this.loginForm.value.email !== "" || this.loginForm.value.email !== "" ) {
        this.authService.adminlogin((this.loginForm.value as User)).subscribe((data)=> {
          if(data.isSuccess){
           localStorage.setItem('token',data.message);
           localStorage.setItem('isLoggedIn',data.isSuccess);
           //navigate to a different page
           this.router.navigate(['/dashboard']);
          } else{
           console.log("error",data);
           this.showErrorMsg = true;
           this.errorText = data.message;
          }
        
       },(error) => {
         // Handle errors here
         this.errorText= "Incorect Email or Password";
         this.showErrorMsg=true;
       })
      } else{
        this.errorText= "Please Enter Email and Password";
        this.showErrorMsg=true;
      }      
 
   
 
   

   }
 

}
