import { Routes } from '@angular/router';
import { ShellPage } from './pages/shell/shell.page';
import { FlightsComponent } from './components/flights/flights.component';
import { GiftAidSummaryComponent } from './components/giftAidSummary/gift-aid-summary.component';
import { AccountsComponent } from './components/accounts/accounts.component';
import { UserComponent } from './components/user/user.component';
import { AuthComponent } from './components/auth/auth';
import { AuthGuard } from 'src/mgc-globals';
import * as MGCGlobals from '../mgc-globals';


export const routes: Routes = [
  { 
    path: 'shell',
    component: ShellPage,
    children: [
      {path: MGCGlobals.routes.ACCOUNT, canActivate: [AuthGuard.canActivateLoggedIn], component: AccountsComponent},
      {path: MGCGlobals.routes.FLIGHTS, canActivate: [AuthGuard.canActivateLoggedIn], component: FlightsComponent},
      {path: MGCGlobals.routes.GIFTAIDSUMMARY, canActivate: [AuthGuard.canActivateLoggedIn], component: GiftAidSummaryComponent},
      {path: MGCGlobals.routes.LOGIN, canActivate: [AuthGuard.canActivateLoggedOut], component: AuthComponent},
      {path: MGCGlobals.routes.MEMBERSHIP, canActivate: [AuthGuard.canActivateLoggedIn], component: UserComponent},
      {path: '**', canActivate: [AuthGuard.canActivateLoggedOut], component: AuthComponent}
    ]
  },
  {
    path: '',
    redirectTo: 'shell/' + MGCGlobals.routes.MEMBERSHIP,
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'shell/' + MGCGlobals.routes.LOGIN,
    pathMatch: 'full'
  }
];
