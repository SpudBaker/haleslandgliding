import { Component, inject } from '@angular/core';
import { IonItem, IonLabel, IonGrid, IonCol, IonRow, IonContent, IonButton, IonImg, IonText, LoadingController, NavController} from '@ionic/angular/standalone';
import { AsyncPipe } from '@angular/common';
import { addIcons } from 'ionicons';
import { homeOutline } from 'ionicons/icons';
import { AuthService } from '../../services/auth/auth';
import { DataService } from 'src/app/services/data/data';
import { from } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { FirebaseError } from '@angular/fire/app';
import { FlightsComponent } from '../../components/nav-flights/nav-flights';
import { AccountsComponent } from '../../components/nav-accounts/nav-accounts';

@Component({
  selector: 'app-flights-page',
  templateUrl: 'flights.page.html',
  styleUrls: ['flights.page.scss'],
  imports: [AsyncPipe, IonItem, IonLabel, IonContent, IonGrid, IonCol, IonRow, IonButton, IonImg, AccountsComponent, FlightsComponent],
})
export class FlightsPage {

  private dataService = inject(DataService);
  public signingOut = false;
  public flights$ = this.dataService.flights$;

  constructor() {
     addIcons({homeOutline});
  }

}
