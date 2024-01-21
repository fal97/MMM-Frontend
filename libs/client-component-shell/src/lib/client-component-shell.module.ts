import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
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
import { MatBadgeModule } from '@angular/material/badge';
import { JwtModule } from '@auth0/angular-jwt';
import {
  AuthGuard,
  CustomInterceptor,
  DataAccessLibModule,
} from '@frontend/data-access-lib';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
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
import { MatIconModule } from '@angular/material/icon';
import { MatSortModule } from '@angular/material/sort';
import { FormsModule } from '@angular/forms';
import { ClientRequestJoinComponent } from './client-request-join/client-request-join.component';
import { ClientLoginComponent } from './client-login/client-login/client-login.component';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { ResetPasswordComponent } from 'libs/shared-lib/src/lib/reset-password/reset-password.component';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { ForgetPasswordComponent } from 'libs/shared-lib/src/lib/forgot-password/forgot-password.component';
import { CreateAccountComponent } from './create-account/create-account.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ClientdashboardComponent } from './home/clientdashboard/clientdashboard.component';
import { MatStepperModule } from '@angular/material/stepper';
import { ClientOnboardingComponent } from './onboar-wizard/client-onboarding/client-onboarding.component';
import { PersonalDeailsComponent } from './onboar-wizard/personal-deails/personal-deails.component';
import { IncomeExpenseComponent } from './onboar-wizard/income-expense/income-expense.component';
import { IncomeComponent } from './onboar-wizard/income-expense/income/income.component';
import { ExpenseComponent } from './onboar-wizard/income-expense/expense/expense.component';
import { DeleteIncomeExpenseDialogComponent } from './onboar-wizard/income-expense/delete-income-expense-dialog/delete-income-expense-dialog.component';
import { CsvUploadWizardComponent } from './onboar-wizard/income-expense/csv-upload-wizard/csv-upload-wizard.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import {
  ClientLayoutComponent,
  LayoutComponent,
  SharedLibModule,
} from '@frontend/shared-lib';
import { MorgateDetailsComponent } from './onboar-wizard/morgate-details/morgate-details.component';
import { MyprofileSummaryComponent } from './onboar-wizard/myprofile-summary/myprofile-summary.component';
import { IncomeSummaryComponent } from './onboar-wizard/myprofile-summary/income-summary/income-summary.component';
import { ExpesnseSummaryComponent } from './onboar-wizard/myprofile-summary/expesnse-summary/expesnse-summary.component';
import { MorgageSummaryComponent } from './onboar-wizard/myprofile-summary/morgage-summary/morgage-summary.component';
import { PersonalDetailSummaryComponent } from './onboar-wizard/myprofile-summary/personal-detail-summary/personal-detail-summary.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { ViewWorkbookComponent } from './view-workbook/view-workbook.component';
import { StrategiesInfoComponent } from './strategies/strategiesInfo/strategies-info.component';

export const clientRoutes: Route[] = [
  { path: '', component: ClientLoginComponent },
  { path: 'forgetPassword', component: ForgetPasswordComponent },
  { path: 'reset', component: ResetPasswordComponent },
  { path: 'clientrequest', component: ClientRequestJoinComponent },
  { path: 'createaccount', component: CreateAccountComponent },
  // { path: 'clientdashboard', component: LayoutComponent },
  // { path: 'clientdashboard', component: ClientdashboardComponent },
  {
    path: 'clientonboard',
    component: ClientOnboardingComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'clientdashboard',
    component: ClientLayoutComponent,
    children: [
      {
        path: '',
        component: ClientdashboardComponent,
        canActivate: [AuthGuard],
      },

      {
        path: 'viewEditMyProfile',
        component: ClientOnboardingComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'viewworkbook',
        component: ViewWorkbookComponent,
        canActivate: [AuthGuard],
      },
    ],
  },
  {path: 'strategyInfo', component: StrategiesInfoComponent}
];

@NgModule({
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
    MatListModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: () => localStorage.getItem('token'),
        allowedDomains: ['http://ahmadmozaffar.net'], // Replace with your JWT issuer domain
        // disallowedRoutes: ["example.com/api/auth"], // Replace with the URL of your authentication API
      },
    }),
    MatChipsModule,
    ReactiveFormsModule,
    MatDialogModule,
    DataAccessLibModule,
    HttpClientModule,
    StoreModule.forRoot(AppState),
    EffectsModule.forRoot([ClientEffects, CountryEffects, WorkshopEffects]),
    MatPaginatorModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatSortModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCheckboxModule,
    FormsModule,
    MatTooltipModule,
    MatBadgeModule,
    MatStepperModule,
    MatAutocompleteModule,
    MatGridListModule,
    SharedLibModule,
  ],
  declarations: [
    ClientRequestJoinComponent,
    ClientLoginComponent,
    CreateAccountComponent,
    ClientdashboardComponent,
    ClientOnboardingComponent,
    PersonalDeailsComponent,
    IncomeExpenseComponent,
    IncomeComponent,
    ExpenseComponent,
    DeleteIncomeExpenseDialogComponent,
    CsvUploadWizardComponent,
    MorgateDetailsComponent,
    MyprofileSummaryComponent,
    IncomeSummaryComponent,
    ExpesnseSummaryComponent,
    MorgageSummaryComponent,
    PersonalDetailSummaryComponent,
    ViewWorkbookComponent,
    StrategiesInfoComponent
  ],
  providers: [AuthGuard],
})
export class ClientComponentShellModule {}
