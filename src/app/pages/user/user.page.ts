import { Component } from '@angular/core';
import { IonIcon, IonGrid, IonCol, IonRow, IonContent, IonButton, IonImg, LoadingController, NavController} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { homeOutline } from 'ionicons/icons';
import { AuthService } from '../../services/auth/auth';
import { Observable, from } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { FirebaseError } from '@angular/fire/app';
import { User } from '@angular/fire/auth';
import { AsyncPipe } from '@angular/common';
import { UserComponent } from "../../components/nav-user/nav-user";
import { FlightsComponent } from '../../components/nav-flights/nav-flights';
import { AccountsComponent } from '../../components/nav-accounts/nav-accounts';

@Component({
  selector: 'app-user-page',
  templateUrl: 'user.page.html',
  styleUrls: ['user.page.scss'],
  imports: [IonContent, AsyncPipe, IonGrid, IonCol, IonRow, IonButton, IonImg, AccountsComponent, UserComponent, FlightsComponent],
})
export class UserPage {

  public user$: Observable<User | null>

  constructor(private authService: AuthService, private loadingController: LoadingController,
    private navController: NavController) {
    this.user$ = authService.user$;
     addIcons({homeOutline});
  }

  public navHome(): Promise<boolean>{
    return this.navController.navigateRoot('home');
  }

  public signOut(){
    from(this.loadingController.create()).pipe(
      switchMap(lc => from(lc.present()).pipe(
        switchMap(() => this.authService.signOut()),
        switchMap(() => lc.dismiss()),
        switchMap(() => this.navHome()),
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
