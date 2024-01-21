import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { DataAccessLibModule } from '@frontend/data-access-lib';

@NgModule({
  imports: [CommonModule, DataAccessLibModule, HttpClientModule],
})
export class StateManagementLibModule {}
