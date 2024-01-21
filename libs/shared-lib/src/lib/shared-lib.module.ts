import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ForgetPasswordComponent } from './forgot-password/forgot-password.component';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';

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
// eslint-disable-next-line @nx/enforce-module-boundaries
import {
  AppState,
  ClientEffects,
  CountryEffects,
  WorkshopEffects,
} from '@frontend/state-management-lib';

import { MatDialogModule } from '@angular/material/dialog';
import { BrowserModule } from '@angular/platform-browser';
import { MatTooltipModule } from '@angular/material/tooltip';
// eslint-disable-next-line @nx/enforce-module-boundaries
import {
  CustomInterceptor,
  DataAccessLibModule,
} from '@frontend/data-access-lib';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { MatPaginatorModule } from '@angular/material/paginator';
import {
  BrowserAnimationsModule,
  provideAnimations,
} from '@angular/platform-browser/animations';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatSortModule } from '@angular/material/sort';
import { FormsModule } from '@angular/forms';
import { MatBadgeModule } from '@angular/material/badge';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { TitleWithButtonComponent } from './title-with-button/title-with-button.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { LayoutComponent } from './layout/layout.component';
import { ContentComponent } from './content/content.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ClientLayoutComponent } from './client-layout/client-layout.component';
import { ClientSidebarComponent } from './client-sidebar/client-sidebar.component';

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
    FormsModule,
    MatTooltipModule,
    MatBadgeModule,
    MatMenuModule

    // ToastrModule.forRoot()
  ],

  declarations: [
    ForgetPasswordComponent,
    ResetPasswordComponent,
    TitleWithButtonComponent,
    TopBarComponent,
    LayoutComponent,
    ContentComponent,
    SidebarComponent,
    ClientLayoutComponent,
    ClientSidebarComponent,
  ],
  providers: [
    {
      // intercepter
      provide: HTTP_INTERCEPTORS,
      useClass: CustomInterceptor,
      multi: true,
    },
    
  ],
  exports: [
    ForgetPasswordComponent,
    ResetPasswordComponent,
    TitleWithButtonComponent,
    TopBarComponent,
    ContentComponent,
    SidebarComponent,
    LayoutComponent,
    ClientLayoutComponent,
  ],
})
export class SharedLibModule {}
