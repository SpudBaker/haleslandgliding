import { Component } from '@angular/core';
import { IonButton, IonCol, IonGrid, IonRow, IonInput, IonText } from '@ionic/angular/standalone';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth/auth';
import { catchError, EMPTY, from, of, switchMap } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FirebaseError } from '@angular/fire/app';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-auth',
  imports: [CommonModule, FormsModule, IonGrid, IonRow, IonCol, IonInput, IonButton, IonText],
  templateUrl: './auth.html',
  styleUrl: './auth.scss'
})
export class AuthComponent {

  public inputEmail = '';
  public inputPassword = '';
  public loginErrMessage: string | undefined;

  constructor(private authService: AuthService, private loadingController: LoadingController){}

  public signIn(){
    this.loginErrMessage = undefined;
    from(this.loadingController.create()).pipe(
      switchMap(lc => from(lc.present()).pipe(
        switchMap(() => this.authService.signIn(this.inputEmail, this.inputPassword)),
        switchMap(() => lc.dismiss()),
        catchError(err => {
          const fbe = err as FirebaseError;
          switch(fbe.code){
            case 'auth/invalid-email':
              this.loginErrMessage = 'Invalid email';
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
