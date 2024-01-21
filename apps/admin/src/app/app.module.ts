import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { appRoutes } from './app.routes';
import { NxWelcomeComponent } from './nx-welcome.component';
import { AdminComponentShellModule } from '@frontend/admin-component-shell';
import { SharedLibModule } from '@frontend/shared-lib';
 
@NgModule({
  declarations: [AppComponent, NxWelcomeComponent],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes, { initialNavigation: 'enabledBlocking' }),
    // SharedLibModule
  // AppShellModule,
   AdminComponentShellModule


    
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
