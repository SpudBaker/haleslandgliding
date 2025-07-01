import { Routes } from '@angular/router';
import { AuthGuard } from 'src/globals';

export const routes: Routes = [
  {
    path: 'home',
    canActivate: [AuthGuard.canActivateLoggedOut],
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
    {
    path: 'user',
    canActivate: [AuthGuard.canActivateLoggedIn],
    loadComponent: () => import('./user/user.page').then((m) => m.UserPage),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
];
