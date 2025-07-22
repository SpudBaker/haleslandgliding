import { Component, inject } from '@angular/core';
import { IonButton, IonCol, IonGrid, IonRow, IonInput, AlertController, AlertOptions, NavController } from '@ionic/angular/standalone';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth/auth';
import { DataService } from 'src/app/services/data/data';
import { GeneralService } from 'src/app/services/general/general';
import { from, of } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FirebaseError } from '@angular/fire/app';
import { catchError, switchMap, tap } from 'rxjs/operators';
import * as MGCGlobals from '../../../mgc-globals';
import { Subscription } from 'rxjs/internal/Subscription';

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
  private mobileSub!: Subscription;
  public colEdge = 4.5;
  public colCentre = 3;
  private navController = inject(NavController);

  constructor(private authService: AuthService, private dataService: DataService, private generalService: GeneralService){
    if(!this.mobileSub){
      this.mobileSub = this.generalService.mobile$.pipe(
        tap(mobile => {
          if(mobile){
            this.colEdge = 3;
            this.colCentre = 6;
          } else{
            this.colEdge = 4;
            this.colCentre = 4;
          }
        })
      ).subscribe()};
  }

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
            if(res.user.emailVerified){
              return this.dataService.callFunction(res.user.email).pipe(
                switchMap(() => this.dataService.member$),
                switchMap(() => ac.dismiss()),
                switchMap(() => this.navController.navigateRoot('shell/' + MGCGlobals.routes.MEMBERSHIP))
              );
            } else {
              return from(ac.dismiss()).pipe(
                switchMap(()=> {
                  const optsError: AlertOptions = {message: 'email has not been verified, select reset password to resend e-mail'};
                  return this.alertController.create(optsError)
                }),
                switchMap(ac => ac.present())
              );
            }
          } else {
            return from(ac.dismiss()).pipe(
              switchMap(()=> {
                const optsError: AlertOptions = {message: 'invalidate credentials, select reset password if forgotten or register email'};
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

  public register(){
    if(this.inputEmail && this.inputPassword){
      this.authService.signup(this.inputEmail, this.inputPassword).pipe(
        switchMap(() => {
          let opts: AlertOptions = {message: 'Email verification is required, please check your inbox'};
          return this.alertController.create(opts);
        }),
        switchMap(ac => ac.present()),
        catchError(fbe => {
          let optsError: AlertOptions = {message: 'unknown error'};
            switch(fbe.code){
              case 'auth/weak-password':
                optsError = {message: fbe.message.slice(10)};
                break;
              case 'auth/email-already-in-use':
                optsError = {message: 'email address already exists'};
                break;
              case 'auth/invalid-email':
                optsError = {message: 'invalid email'}
            }
          return from(this.alertController.create(optsError)).pipe(
            switchMap(ac => ac.present())
          );
        })
      ).subscribe();
    } else {
      let optsError: AlertOptions = {message: 'email and password are required to register'};
      from(this.alertController.create(optsError)).pipe(
        switchMap(ac => ac.present())
      ).subscribe();
    }
  }

  public resetPassword(){
    this.authService.sendPasswordResetEmail(this.inputEmail).pipe(
      switchMap(res => {
        const opts: AlertOptions = {
          message: "A link has been sent to " + this.inputEmail + ". Please check your inbox."
        };
        return this.alertController.create(opts);
      }),
      switchMap(ac => ac.present())
    ).subscribe();
  }

}
