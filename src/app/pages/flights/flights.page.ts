import { Component, inject } from '@angular/core';
import { IonItem, IonLabel, IonGrid, IonCol, IonRow, IonContent, IonImg} from '@ionic/angular/standalone';
import { AsyncPipe } from '@angular/common';
import { addIcons } from 'ionicons';
import { homeOutline } from 'ionicons/icons';
import { DataService } from 'src/app/services/data/data';
import { UserComponent } from '../../components/nav-user/nav-user';
import { AccountsComponent } from '../../components/nav-accounts/nav-accounts';

@Component({
  selector: 'app-flights-page',
  templateUrl: 'flights.page.html',
  styleUrls: ['flights.page.scss'],
  imports: [AsyncPipe, IonItem, IonLabel, IonContent, IonGrid, IonCol, IonRow, IonImg, AccountsComponent, UserComponent],
})
export class FlightsPage {

  private dataService = inject(DataService);
  public signingOut = false;
  public flights$ = this.dataService.flights$;

  constructor() {
     addIcons({homeOutline});
  }

}
