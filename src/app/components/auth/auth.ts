import { Component } from '@angular/core';
import { IonButton, IonCol, IonGrid, IonRow, IonInput, IonText } from '@ionic/angular/standalone';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth/auth';
import { catchError, EMPTY, from, of } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FirebaseError } from '@angular/fire/app';

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

  constructor(private authService: AuthService){}

  public signIn(){
    this.loginErrMessage = undefined;
    this.authService.signin(this.inputEmail, this.inputPassword).pipe(
      catchError(err => {
        const fbe = err as FirebaseError;
        switch(fbe.code){
          case 'auth/invalid-email':
            this.loginErrMessage = 'Invalid email';
            break;
          default:
            this.loginErrMessage = fbe.message;
        }
        return EMPTY
      })
    ).subscribe();
  }

  public resetPassword(){

  }

}
