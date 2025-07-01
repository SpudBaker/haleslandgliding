import { Component } from '@angular/core';
import { IonImg, IonGrid, IonCol, IonRow, IonContent, NavController } from '@ionic/angular/standalone';
import { AuthService } from '../../services/auth/auth';
import { AuthComponent } from "../../components/auth/auth";

@Component({
  selector: 'app-home-page',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonContent, IonGrid, IonRow, IonCol, IonImg, 
    AuthComponent],
})
export class HomePage {

  constructor(public authService: AuthService, private navController: NavController) {}

}
