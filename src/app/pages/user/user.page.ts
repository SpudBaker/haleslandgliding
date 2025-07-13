import { Component } from '@angular/core';
import { IonItem, IonLabel, IonGrid, IonCol, IonRow, IonContent, IonButton, IonImg, IonText, LoadingController, NavController} from '@ionic/angular/standalone';
import { AsyncPipe } from '@angular/common';
import { addIcons } from 'ionicons';
import { homeOutline } from 'ionicons/icons';
import { AuthService } from '../../services/auth/auth';
import { DataService } from 'src/app/services/data/data';
import { from } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { FirebaseError } from '@angular/fire/app';
import { FlightsComponent } from '../../components/nav-flights/nav-flights';
import { AccountsComponent } from '../../components/nav-accounts/nav-accounts';
import * as Globals from '../../../mgc-globals';

@Component({
  selector: 'app-user-page',
  templateUrl: 'user.page.html',
  styleUrls: ['user.page.scss'],
  imports: [AsyncPipe, IonItem, IonLabel, IonContent, IonGrid, IonCol, IonRow, IonButton, IonImg, AccountsComponent, FlightsComponent],
})
export class UserPage {

  public signingOut = false;
  public member$ = this.dataService.member$;

  constructor(private authService: AuthService, private dataService: DataService, private loadingController: LoadingController,
    private navController: NavController) {
     addIcons({homeOutline});
  }

  public signOut(){
    this.signingOut = true;
    from(this.loadingController.create()).pipe(
      switchMap(lc => from(lc.present()).pipe(
        switchMap(() => this.authService.signOut()),
        map(() => this.dataService.resetLogOut()),
        switchMap(() => lc.dismiss()),
        switchMap(() => this.navController.navigateRoot('home')),
        catchError(err => {
          this.signingOut = false
          const fbe = err as FirebaseError;
          switch(fbe.code){
            }
          return lc.dismiss();
        })
      ))
    ).subscribe();
  }

}
