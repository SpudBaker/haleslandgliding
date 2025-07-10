import { Component, inject } from '@angular/core';
import { IonButton, IonCol, IonGrid, IonRow, IonInput, IonText, LoadingController, NavController } from '@ionic/angular/standalone';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth/auth';
import { DataService } from 'src/app/services/data/data';
import { catchError, from, map, switchMap } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FirebaseError } from '@angular/fire/app';

@Component({
  selector: 'app-auth',
  imports: [CommonModule, FormsModule, IonGrid, IonRow, IonCol, IonInput, IonButton, IonText],
  templateUrl: './auth.html',
  styleUrl: './auth.scss',
  providers: [LoadingController, NavController]
})
export class AuthComponent {

  public inputEmail = '';
  public inputPassword = '';
  public loginErrMessage: string | undefined;
  private loadingController = inject(LoadingController);
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
    this.loginErrMessage = undefined;
    from(this.loadingController.create()).pipe(
      switchMap(lc => from(lc.present()).pipe(
        switchMap(()=> this.dataService.callFunction('spudbaker@gmail.com')),
        map(data => console.log('data', data)),
        switchMap(() => this.dataService.getMemberDetails(this.inputEmail)),
        switchMap(member => {
          if(member){
            return this.authService.signIn(this.inputEmail, this.inputPassword).pipe(
                    switchMap(() => lc.dismiss()),
                    switchMap(() => this.navController.navigateRoot('user'))
              )
            } else {
              this.loginErrMessage = 'email does not appear to belong to a member of Mendip Gliding Club';
              return lc.dismiss();
          }
        }),
        catchError(err => {
          const fbe = err as FirebaseError;
          console.log('signIn catchError', fbe)
          switch(fbe.code){
            case 'auth/invalid-email':
              this.loginErrMessage = 'Invalid email';
              break;
            case 'auth/missing-password':
              this.loginErrMessage = 'Password is required';
              break;
            case 'auth/invalid-credential':
              this.loginErrMessage = 'Incorrect password';
              break;
            default:
              this.loginErrMessage = fbe.message;
          }
          return lc.dismiss();
        })
      ))
    ).subscribe();
  }

  public resetPassword(){
    this.authService.sendPasswordResetEmail(this.inputEmail).subscribe();
  }

}
