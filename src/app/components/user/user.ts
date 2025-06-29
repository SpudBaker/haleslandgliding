import { Component } from '@angular/core';
import { IonButton, IonCol, IonGrid, IonRow, IonInput, IonText } from '@ionic/angular/standalone';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth/auth';
import { ReplaySubject, catchError, EMPTY } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FirebaseError } from '@angular/fire/app';
import { User } from '@angular/fire/auth';

@Component({
  selector: 'app-user',
  imports: [CommonModule, FormsModule, IonGrid, IonRow, IonCol, IonButton],
  templateUrl: './user.html',
  styleUrl: './user.scss'
})
export class UserComponent {

  public user$: ReplaySubject<User | null>

  constructor(private authService: AuthService){
    this.user$ = authService.user$;
  }

  public signOut(){
    this.authService.signOut().pipe(
      catchError(err => {
        const fbe = err as FirebaseError;
        switch(fbe.code){
        }
        return EMPTY
      })
    ).subscribe();
  }

}
