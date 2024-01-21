import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService, UserRegister } from '@frontend/data-access-lib';
import Swal from 'sweetalert2';


@Component({
  selector: 'frontend-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css'],
})
export class CreateAccountComponent implements OnInit {
  constructor(private fd: FormBuilder, 
    private route: ActivatedRoute,
    private authService: AuthService,
    private router: Router,
    ) {}

  hide = true;
  confirmhide = true;
  checkbox = false;

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      // Assign email and token values when query parameters are available
      this.resetPasswordForm.patchValue({
        email: params['email'],
      });

      console.log('onInit++', this.resetPasswordForm.value);
    });
  }

  resetPasswordForm = this.fd.group({
    email: [''],
    password: [
      '',
      // eslint-disable-next-line no-useless-escape
      [Validators.required, Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{6,})/), Validators.minLength(6)],
    ],
    confirmpassword: [
      '',
      // eslint-disable-next-line no-useless-escape
      [Validators.required, Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{6,})/), Validators.minLength(6)],
    ],
  });

  showErrorMsg = false;
  errorText = '';
  isError = true;

  submit() {
    // Check if email and token values are available
    this.authService.clientRegister(this.resetPasswordForm.value as UserRegister).subscribe((data:any) => {
        this.isError = false;
        this.showErrorMsg = true;
        // this.errorText = data.message;

        Swal.fire(
          'Success',
          'Client Created Successfully',
          'success'
        ).then(() => {
          localStorage.setItem('token',data.message);
          localStorage.setItem('isLoggedIn',data.isSuccess);

          this.router.navigate(['/clientonboard']);
        })

        

     
      
    },(err) => {
      this.isError = true;
        this.showErrorMsg = true;
        this.errorText = err.error.message;
    },)
    
  }
}
