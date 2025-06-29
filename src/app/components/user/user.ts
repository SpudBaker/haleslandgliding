import { Component } from '@angular/core';
import { IonButton, IonCol, IonGrid, IonRow, IonIcon, NavController } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { personOutline } from 'ionicons/icons';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth/auth';
import { ReplaySubject, catchError, from, switchMap } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FirebaseError } from '@angular/fire/app';
import { User } from '@angular/fire/auth';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-user',
  imports: [CommonModule, FormsModule, IonGrid, IonRow, IonCol, IonButton, IonIcon],
  templateUrl: './user.html',
  styleUrl: './user.scss'
})
export class UserComponent {

  public user$: ReplaySubject<User | null>

  constructor(private authService: AuthService, private loadingController: LoadingController, private navController: NavController){
    this.user$ = authService.user$;
    addIcons({personOutline});
  }

  public signOut(){
    from(this.loadingController.create()).pipe(
      switchMap(lc => from(lc.present()).pipe(
        switchMap(() => this.authService.signOut()),
        switchMap(() => lc.dismiss()),
        catchError(err => {
          const fbe = err as FirebaseError;
          switch(fbe.code){
            }
          return lc.dismiss();
        })
      ))
    ).subscribe();
  }

  public navUserPage(): void{
    this.navController.navigateRoot('user');
  }

}
