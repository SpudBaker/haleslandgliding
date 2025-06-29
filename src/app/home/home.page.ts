import { Component } from '@angular/core';
import { IonImg, IonGrid, IonCol, IonRow, IonContent } from '@ionic/angular/standalone';
import { AuthService } from '../services/auth/auth';
import { map, Observable, ReplaySubject } from 'rxjs';
import { tap } from 'rxjs';
import { AuthComponent } from "../components/auth/auth";
import { User } from '@angular/fire/auth';
import { AsyncPipe } from '@angular/common';
import { UserComponent } from '../components/user/user';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonContent, IonGrid, IonRow, IonCol, IonImg, 
    AuthComponent, AsyncPipe, UserComponent],
})
export class HomePage {

  public authInitiated = false;
  public user$: Observable<User | null>

  constructor(private authService: AuthService) {
    this.user$ = authService.user$.pipe(
      tap(() => this.authInitiated = true)
    )
  }

  public ngOnInit(): void{
    this.authService.user$.pipe(map(user => console.log('user sub',user))).subscribe();
  }

}
