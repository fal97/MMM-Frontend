import { Route } from '@angular/router';
import { authRoutes } from '@frontend/admin-component-shell';

export const appRoutes: Route[] = [
    {path:'',children: authRoutes}
];
