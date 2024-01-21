import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { InviteStatusType, MmmClientService } from '@frontend/data-access-lib';
import { AppStateModel, addclient, getclientinfo } from '@frontend/state-management-lib';
import { Store } from '@ngrx/store';
import Swal from 'sweetalert2';

@Component({
  selector: 'frontend-client-request-join',
  templateUrl: './client-request-join.component.html',
  styleUrls: ['./client-request-join.component.css'],
})
export class ClientRequestJoinComponent {
  constructor(private fd: FormBuilder,
    private store: Store<AppStateModel>,
    private service : MmmClientService,
    private router: Router,

    ) {}

  requestForm = this.fd.group({
    name: ['', Validators.required],
    email: [
      '',
      [
        Validators.required,
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
      ],
    ],
    contactNumber: [
      '',
      [Validators.required, Validators.pattern('(([+][(]?[0-9]{1,3}[)]?)|([(]?[0-9]{4}[)]?))s*[)]?[-s.]?[(]?[0-9]{1,3}[)]?([-s.]?[0-9]{3})([-s.]?[0-9]{3,4})')]
    ],
    inviteStatus: InviteStatusType.REQUESTED
  });

  submit() {
    this.service.requestAccount(this.requestForm.value)
    .subscribe((res:any) => {

      Swal.fire(
        'Success',
        'Your Request Sent Successfully',
        'success'
      );

    
        // this.requestForm.reset();
  
     
        this.router.navigate(['/']);
      
      
      
    })
  }

  resetField()
  {
    this.requestForm.reset();
  }

  redirectToLogin()
  {
    this.router.navigate(['/']);
  }
}
