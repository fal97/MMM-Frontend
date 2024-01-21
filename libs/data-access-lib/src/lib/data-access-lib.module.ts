import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatToolbarModule} from '@angular/material/toolbar';
// import{Client} from './models/mmm-client';
@NgModule({
  imports: [CommonModule,MatToolbarModule],
  //  providers:[MmmClientService]
  // exports:[MmmClientService]
})
export class DataAccessLibModule {}
export * from './services/mmm-client.service';
export * from './models/mmm-client';
export * from './models/mmm-workshop';
export * from './services/mmm-workshop.service';
export * from './services/auth.service';
export * from './services/custom.interceptor';
export * from './services/shared.service';
export * from './services/auth-guard.service';
export * from './services/mmm-admin.service';