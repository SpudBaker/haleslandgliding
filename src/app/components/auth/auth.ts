import { Component, inject } from '@angular/core';
import { IonButton, IonCol, IonGrid, IonRow, IonInput, AlertController, AlertOptions, NavController } from '@ionic/angular/standalone';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth/auth';
import { DataService } from 'src/app/services/data/data';
import { catchError, from, map, switchMap } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FirebaseError } from '@angular/fire/app';
import { of } from 'rxjs';

@Component({
  selector: 'app-auth',
  imports: [CommonModule, FormsModule, IonGrid, IonRow, IonCol, IonInput, IonButton],
  templateUrl: './auth.html',
  styleUrl: './auth.scss',
  providers: []
})
export class AuthComponent {

  public inputEmail = '';
  public inputPassword = '';
  private alertController = inject(AlertController);
  private navController = inject(NavController);

  constructor(private authService: AuthService, private dataService: DataService){}

  public disableButton(): boolean {
    if(this.inputEmail?.length > 0 && this.inputPassword?.length > 0){
      return false;
    } else {
      return true;
    }
  }

  public signIn(){
    const opts: AlertOptions = {
      message: "Logging in..."
    }
    from(this.alertController.create(opts)).pipe(
      switchMap(ac => from(ac.present()).pipe(
        switchMap(() => this.authService.signIn(this.inputEmail, this.inputPassword)),
        switchMap(res => {
          if (res.user.email) {
            return this.dataService.callFunction(res.user.email).pipe(
              switchMap(() => this.dataService.member$),
              switchMap(() => ac.dismiss()),
              switchMap(() => this.navController.navigateRoot('user'))
            );
          } else {
            return from(ac.dismiss()).pipe(
              switchMap(()=> {
                const optsError: AlertOptions = {message: 'email does not appear to belong to a member of Mendip Gliding Club'};
                return this.alertController.create(optsError)
              }),
              switchMap(ac => ac.present())
            );
          }
        }),
        catchError(err => {
          const fbe = err as FirebaseError;
          return of(ac.dismiss()).pipe(
            switchMap(() => {
              let optsError = {message: 'unknown error'};
              switch(fbe.code){
                case 'auth/invalid-email':
                  optsError = {message: 'invalid email'};
                  break;
                case 'auth/missing-password':
                  optsError = {message: 'password is required'};
                  break;
                case 'auth/invalid-credential':
                  optsError = {message: 'invalid credentials'};
                  break;
              }
              return from(this.alertController.create(optsError)).pipe(
                switchMap(ac => ac.present())
              )
            })
          );
        })
      ))
    ).subscribe();
  }

  public resetPassword(){
    this.authService.sendPasswordResetEmail(this.inputEmail).subscribe();
  }

}
