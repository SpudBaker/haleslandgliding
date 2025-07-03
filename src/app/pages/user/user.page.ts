import { Component } from '@angular/core';
import { IonItem, IonLabel, IonGrid, IonCol, IonRow, IonContent, IonButton, IonImg, IonText, LoadingController, NavController} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { homeOutline } from 'ionicons/icons';
import { AuthService } from '../../services/auth/auth';
import { DataService } from 'src/app/services/data/data';
import { from } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { FirebaseError } from '@angular/fire/app';
import { FlightsComponent } from '../../components/nav-flights/nav-flights';
import { AccountsComponent } from '../../components/nav-accounts/nav-accounts';
import * as Globals from '../../../globals';

@Component({
  selector: 'app-user-page',
  templateUrl: 'user.page.html',
  styleUrls: ['user.page.scss'],
  imports: [IonItem, IonLabel, IonContent, IonGrid, IonCol, IonRow, IonButton, IonImg, AccountsComponent, FlightsComponent],
})
export class UserPage {

  public signingOut = false;
  public member?: Globals.Member;

  constructor(private authService: AuthService, private dataService: DataService, private loadingController: LoadingController,
    private navController: NavController) {
    this.member = dataService.getSignedInMember();
     addIcons({homeOutline});
  }

  public signOut(){
    this.signingOut = true;
    from(this.loadingController.create()).pipe(
      switchMap(lc => from(lc.present()).pipe(
        switchMap(() => this.authService.signOut()),
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
