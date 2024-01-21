import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddNewClientComponent } from './client-management/add-new-client/add-new-client.component';
import { ClientListComponent } from './client-management/client-list/client-list.component';
import { UpdateClientComponent } from './client-management/update-client/update-client.component';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { Route, RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatChipsModule } from '@angular/material/chips';
import { ReactiveFormsModule } from '@angular/forms';

import { MatDialogModule } from '@angular/material/dialog';
import { BrowserModule } from '@angular/platform-browser';
import { MatTooltipModule } from '@angular/material/tooltip';
// eslint-disable-next-line @nx/enforce-module-boundaries
import {
  AuthGuard,
  CustomInterceptor,
  DataAccessLibModule,
} from '@frontend/data-access-lib';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
// eslint-disable-next-line @nx/enforce-module-boundaries
import {
  AppState,
  ClientEffects,
  CountryEffects,
  WorkshopEffects,
} from '@frontend/state-management-lib';
import { EffectsModule } from '@ngrx/effects';
import { MatPaginatorModule } from '@angular/material/paginator';
import {
  BrowserAnimationsModule,
  provideAnimations,
} from '@angular/platform-browser/animations';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { ToastrModule, provideToastr } from 'ngx-toastr';
import { MatToolbarModule } from '@angular/material/toolbar';
 
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { MatIconModule } from '@angular/material/icon';
import { MatSortModule } from '@angular/material/sort';
import { WorkshoplistComponent } from './workshop-management/workshoplist/workshoplist.component';
import { AddNewWorkshopComponent } from './workshop-management/add-new-workshop/add-new-workshop.component';
import { FormsModule } from '@angular/forms';
import { ApproveRejectComponent } from './client-management/approve-reject/approve-reject.component';
import { MatBadgeModule } from '@angular/material/badge';
import { UpdateWorkshopComponent } from './workshop-management/update-workshop/update-workshop.component';
import { RejectDialogComponent } from './client-management/approve-reject/reject-dialog/reject-dialog.component';
// eslint-disable-next-line @nx/enforce-module-boundaries
import {
  LayoutComponent,
  TitleWithButtonComponent,
} from '@frontend/shared-lib';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { SharedLibModule } from '@frontend/shared-lib';
import { JwtModule } from '@auth0/angular-jwt';
import { AdminDashboardComponent } from './home/admin-dashboard/admin-dashboard.component';

export const authRoutes: Route[] = [
  { path: '', component: AdminLoginComponent },
  // { path: 'forgetPassword', component: ForgetPasswordComponent },
  // { path: 'reset', component: ResetPasswordComponent },
  {
    path: 'dashboard',
    component: LayoutComponent,
    children: [
      { path: '', component:   AdminDashboardComponent,  canActivate: [AuthGuard]},
      { path: 'clientManagement', component: ClientListComponent ,  canActivate: [AuthGuard] },
      { path: 'add', component: AddNewClientComponent ,  canActivate: [AuthGuard]},
      { path: 'edit/:id', component: UpdateClientComponent ,  canActivate: [AuthGuard]},
      { path: 'workshopManagement', component: WorkshoplistComponent ,  canActivate: [AuthGuard]},
      { path: 'workshopManagementAdd', component: AddNewWorkshopComponent ,  canActivate: [AuthGuard]},
      { path: 'approval/:id', component: ApproveRejectComponent ,  canActivate: [AuthGuard]},
      { path: 'workshopedit/:id', component: UpdateWorkshopComponent,  canActivate: [AuthGuard] },
    ],
  },
  { path: 'admindashbord', component: AdminDashboardComponent,  canActivate: [AuthGuard] },
];

@NgModule({
  declarations: [
    AddNewClientComponent,
    ClientListComponent,
    UpdateClientComponent,
    AdminLoginComponent,
    WorkshoplistComponent,
    AddNewWorkshopComponent,
    ApproveRejectComponent,
    UpdateWorkshopComponent,
    RejectDialogComponent,
  ],
  providers: [
    {
      // intercepter
      provide: HTTP_INTERCEPTORS,
      useClass: CustomInterceptor,
      multi: true,
    },
    TitleWithButtonComponent,
    AuthGuard,
 
  ],
  exports: [
    ClientListComponent,
    AddNewClientComponent,
    AddNewWorkshopComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatTableModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatRadioModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatChipsModule,
    ReactiveFormsModule,
    MatDialogModule,
    DataAccessLibModule,
    HttpClientModule,
    StoreModule.forRoot(AppState),
    EffectsModule.forRoot([ClientEffects, CountryEffects, WorkshopEffects]),
    MatPaginatorModule,
    MatSidenavModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: () => localStorage.getItem('token'),
        allowedDomains: ['http://ahmadmozaffar.net'], // Replace with your JWT issuer domain
        // disallowedRoutes: ["example.com/api/auth"], // Replace with the URL of your authentication API
      },
    }),
    MatListModule,
    MatIconModule,
    MatSortModule,
    MatDatepickerModule,
    MatNativeDateModule,
    FormsModule,
    MatTooltipModule,
    MatBadgeModule,
    SharedLibModule,
  ],
})
export class AdminComponentShellModule {}
