import { Routes } from '@angular/router';
import { AuthGuard } from 'src/mgc-globals';

export const routes: Routes = [
  {
    path: 'accounts',
    canActivate: [AuthGuard.canActivateLoggedIn],
    loadComponent: () => import('./pages/accounts/accounts.page').then(m => m.AccountsPage)
  },
  {
    path: 'flights',
    canActivate: [AuthGuard.canActivateLoggedIn],
    loadComponent: () => import('./pages/flights/flights.page').then(m => m.FlightsPage)
  },
  {
    path: 'home',
    canActivate: [AuthGuard.canActivateLoggedOut],
    loadComponent: () => import('./pages/home/home.page').then((m) => m.HomePage)
  },
    {
    path: 'user',
    canActivate: [AuthGuard.canActivateLoggedIn],
    loadComponent: () => import('./pages/user/user.page').then((m) => m.UserPage),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
];
