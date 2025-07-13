import { Component, inject } from '@angular/core';
import { IonItem, IonLabel, IonGrid, IonCol, IonRow, IonContent, IonButton, IonImg} from '@ionic/angular/standalone';
import { AsyncPipe } from '@angular/common';
import { addIcons } from 'ionicons';
import { homeOutline } from 'ionicons/icons';
import { DataService } from 'src/app/services/data/data';
import { FlightsComponent } from '../../components/nav-flights/nav-flights';
import { UserComponent } from '../../components/nav-user/nav-user';

@Component({
  selector: 'app-accounts-page',
  templateUrl: 'accounts.page.html',
  styleUrls: ['accounts.page.scss'],
  imports: [AsyncPipe, IonItem, IonLabel, IonContent, IonGrid, IonCol, IonRow, IonImg, UserComponent, FlightsComponent],
})
export class AccountsPage {

  private dataService = inject(DataService);
  public signingOut = false;
  public accounts$ = this.dataService.accounts$;

  constructor() {
     addIcons({homeOutline});
  }

}
