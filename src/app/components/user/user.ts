import { Component } from '@angular/core';
import { IonCol, IonGrid, IonRow, IonIcon, NavController } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { personCircleOutline } from 'ionicons/icons';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth/auth';
import { ReplaySubject } from 'rxjs';
import { CommonModule } from '@angular/common';
import { User } from '@angular/fire/auth';

@Component({
  selector: 'app-user',
  imports: [CommonModule, FormsModule, IonGrid, IonRow, IonCol, IonIcon],
  templateUrl: './user.html',
  styleUrl: './user.scss'
})
export class UserComponent {

  public user$: ReplaySubject<User | null>

  constructor(private authService: AuthService, private navController: NavController){
    this.user$ = this.authService.user$;
       addIcons({personCircleOutline});
  }

  public navUserPage(): void{
    this.navController.navigateRoot('user');
  }

}
