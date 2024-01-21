import { Route } from '@angular/router';
import { NxWelcomeComponent } from './nx-welcome.component';
import { clientRoutes } from '@frontend/client-component-shell';

export const appRoutes: Route[] = [
    {path:'', children: clientRoutes}
];
