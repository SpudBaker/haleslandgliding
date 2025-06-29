import { Component } from '@angular/core';
import { IonImg, IonGrid, IonCol, IonRow, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/angular/standalone';
import { AuthService } from '../services/auth/auth';
import { map, ReplaySubject } from 'rxjs';
import { AuthComponent } from "../components/auth/auth";
import { User } from '@angular/fire/auth';
import { AsyncPipe } from '@angular/common';
import { UserComponent } from '../components/user/user';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonGrid, IonRow, IonCol, IonImg, 
    AuthComponent, AsyncPipe, UserComponent],
})
export class HomePage {

  public user$: ReplaySubject<User | null>

  constructor(private authService: AuthService) {
    this.user$ = authService.user$;
  }

  public ngOnInit(): void{
    this.authService.user$.pipe(map(user => console.log('user sub',user))).subscribe();
    this.authService.signup('spudbakefegg@gmail.com','dffdghjh89£gh')
    .then(res => console.log('user signed up', res))
    .catch(err => console.log('user sign up err', err))
  }

}
