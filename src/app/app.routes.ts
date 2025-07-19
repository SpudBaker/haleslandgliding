import { Routes } from '@angular/router';
import { ShellPage } from './pages/shell/shell.page';
import { FlightsComponent } from './components/flights/flights.component';
import { AccountsComponent } from './components/accounts/accounts.component';
import { UserComponent } from './components/user/user.component';
import { AuthComponent } from './components/auth/auth';
import { AuthGuard } from 'src/mgc-globals';

export const routes: Routes = [
  { 
    path: 'shell',
    component: ShellPage,
    children: [
      {path: 'accounts', canActivate: [AuthGuard.canActivateLoggedIn], component: AccountsComponent},
      {path: 'flights', canActivate: [AuthGuard.canActivateLoggedIn], component: FlightsComponent},
      {path: 'user', canActivate: [AuthGuard.canActivateLoggedIn], component: UserComponent},
      {path: 'login', canActivate: [AuthGuard.canActivateLoggedOut], component: AuthComponent},
      {path: '**', canActivate: [AuthGuard.canActivateLoggedOut], component: AuthComponent}
    ]
  },
  {
    path: '',
    redirectTo: 'shell/user',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'shell/login',
    pathMatch: 'full'
  }
];
