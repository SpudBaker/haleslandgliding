import { Component } from '@angular/core';
import { IonCol, IonGrid, IonRow, IonIcon, NavController } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { airplaneOutline } from 'ionicons/icons';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth/auth';
import { ReplaySubject } from 'rxjs';
import { CommonModule } from '@angular/common';
import { User } from '@angular/fire/auth';

@Component({
  selector: 'app-nav-flights',
  imports: [CommonModule, FormsModule, IonGrid, IonRow, IonCol, IonIcon],
  templateUrl: './nav-flights.html',
  styleUrl: './nav-flights.scss'
})
export class FlightsComponent {

  public user$: ReplaySubject<User | null>

  constructor(private authService: AuthService, private navController: NavController){
    this.user$ = this.authService.user$;
       addIcons({airplaneOutline});
  }

  public navUserPage(): void{
    this.navController.navigateRoot('flights');
  }

}
