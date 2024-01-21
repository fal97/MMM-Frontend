import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { ResetPasswordViewModel, AuthService } from '@frontend/data-access-lib';

@Component({
  selector: 'frontend-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css'],
})
export class ResetPasswordComponent implements OnInit {
  constructor(
    private fd: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {}
  hide = true;
  confirmhide = true;
  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      // Assign email and token values when query parameters are available
      this.resetPasswordForm.patchValue({
        email: params['email'],
        token: params['token'],
      });

      console.log('onInit', this.resetPasswordForm.value);
    });
  }

  resetPasswordForm = this.fd.group({
    newPassword: [
      '',
      [Validators.required,  Validators.pattern(/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/), Validators.max(50)],
    ],
    confirmPassword: [
      '',
      [Validators.required, Validators.pattern(/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/), Validators.max(50)],
    ],
    email: [''],
    token: [''],
  });

  showErrorMsg = false;
  errorText = '';
  isError = true;

  redirectToLogin() {
    this.router.navigate(['/']);
  }

  submit() {
    // Check if email and token values are available
    const email = this.resetPasswordForm.value.email;
    const token = this.resetPasswordForm.value.token;

    if (
      email &&
      token &&
      this.resetPasswordForm.value.newPassword !== '' &&
      this.resetPasswordForm.value.confirmPassword !== ''
    ) {
      this.authService
        .resetPassword(this.resetPasswordForm.value as ResetPasswordViewModel)
        .subscribe((data) => {
          if (data.isSuccess) {
            this.isError = false;
            this.showErrorMsg = true;
            this.errorText = data.message;
          } else {
            this.isError = true;
            this.showErrorMsg = true;
            this.errorText = data.message;
          }
        });
    }
  }
}
