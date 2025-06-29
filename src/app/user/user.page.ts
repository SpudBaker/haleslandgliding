import { Component } from '@angular/core';
import { IonImg, IonGrid, IonCol, IonRow, IonContent } from '@ionic/angular/standalone';
import { AuthService } from '../services/auth/auth';
import { Observable } from 'rxjs';
import { tap } from 'rxjs';
import { AuthComponent } from "../components/auth/auth";
import { User } from '@angular/fire/auth';
import { AsyncPipe } from '@angular/common';
import { UserComponent } from '../components/user/user';

@Component({
  selector: 'app-user-page',
  templateUrl: 'user.page.html',
  styleUrls: ['user.page.scss'],
  imports: [IonContent],
})
export class UserPage {

  public user$: Observable<User | null>

  constructor(private authService: AuthService) {
    this.user$ = authService.user$;
  }

}
