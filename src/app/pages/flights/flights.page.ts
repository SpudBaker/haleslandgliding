import { Component } from '@angular/core';
import { IonGrid, IonCol, IonRow, IonContent, IonImg, LoadingController, NavController} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { homeOutline } from 'ionicons/icons';
import { AuthService } from '../../services/auth/auth';
import { Observable, from } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { FirebaseError } from '@angular/fire/app';
import { User } from '@angular/fire/auth';
import { UserComponent } from "../../components/nav-user/nav-user";
import { AccountsComponent } from "../../components/nav-accounts/nav-accounts";

@Component({
  selector: 'app-flights-page',
  templateUrl: 'flights.page.html',
  styleUrls: ['flights.page.scss'],
  imports: [IonContent, IonGrid, IonCol, IonRow, IonImg,
    UserComponent, AccountsComponent],
})
export class FlightsPage {

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
