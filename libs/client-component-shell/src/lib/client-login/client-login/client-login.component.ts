import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import {  User ,AuthService } from '@frontend/data-access-lib';
import { JwtHelperService } from "@auth0/angular-jwt";

@Component({
  selector: 'frontend-client-login',
  templateUrl: './client-login.component.html',
  styleUrls: ['./client-login.component.css'],
})

export class ClientLoginComponent implements OnInit {
  constructor(private fd: FormBuilder,
   private authService: AuthService,
   private jwtHelper: JwtHelperService,
   private router: Router,
   ) {}

   isOnBoardingCompeleted:any;
   ngOnInit(): void {
     //Redirecting to the dashboard if the client is already logged in
     const token = localStorage.getItem('token'); 
     if(token){
      
      // this.DecodeToken(token);
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
       this.authService.clientlogin((this.loginForm.value as User)).subscribe((data)=> {
         if(data.isSuccess){
          localStorage.setItem('token',data.message);
          localStorage.setItem('isLoggedIn',data.isSuccess);
          if (data.message) {
            this.DecodeToken(data.message);     
          }       
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

  DecodeToken(token:string){
    const decodedToken = this.jwtHelper.decodeToken(token);
    this.isOnBoardingCompeleted = decodedToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/userdata"]; 

    if(this.isOnBoardingCompeleted == "True"){
      this.router.navigate(['/clientdashboard']);
    }
    else{
      this.router.navigate(['/clientonboard']);
    }   
  }

}