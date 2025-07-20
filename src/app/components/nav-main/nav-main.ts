import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonButton, IonCol, IonGrid, IonRow, IonIcon, LoadingController, NavController } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { airplaneOutline, cashOutline, personCircleOutline } from 'ionicons/icons';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth/auth';
import { DataService } from 'src/app/services/data/data';
import { from, ReplaySubject } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { User } from '@angular/fire/auth';
import { FirebaseError } from '@angular/fire/app';
import * as MGCGlobals from '../../../mgc-globals';
@Component({
  selector: 'app-nav-main',
  imports: [CommonModule, FormsModule, IonGrid, IonButton, IonRow, IonCol, IonIcon],
  templateUrl: './nav-main.html',
  styleUrl: './nav-main.scss'
})
export class NavMainComponent {

  private authService = inject(AuthService);
  private dataService = inject(DataService);
  private loadingController = inject(LoadingController);
  public MGCGlobals = MGCGlobals;
  private navController = inject(NavController);
  public selectedRoute$: ReplaySubject<string>;
  public user$: ReplaySubject<User | null>;

  constructor(){
    this.selectedRoute$ = this.authService.selectedRoute;
    this.user$ = this.authService.user$;
    addIcons({airplaneOutline, cashOutline, personCircleOutline});
  }

  public navAccountsPage(): void{
    this.navController.navigateRoot('shell/' + MGCGlobals.routes.ACCOUNTS);
  }

  public navFlightsPage(): void{
    this.navController.navigateRoot('shell/' + MGCGlobals.routes.FLIGHTS);
  }
  
  public navUserPage(): void{
    this.navController.navigateRoot('shell/' + MGCGlobals.routes.MEMBERSHIP);
  }

  public signOut(){
    from(this.loadingController.create()).pipe(
      switchMap(lc => from(lc.present()).pipe(
        switchMap(() => this.authService.signOut()),
        map(() => this.dataService.resetLogOut()),
        switchMap(() => lc.dismiss()),
        switchMap(() => this.navController.navigateRoot('shell/login')),
        catchError(err => {
          const fbe = err as FirebaseError;
          switch(fbe.code){
            }
          return lc.dismiss();
        })
      ))
    ).subscribe();
  }

}
