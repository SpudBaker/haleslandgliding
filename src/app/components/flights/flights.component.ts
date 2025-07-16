import { Component, inject } from '@angular/core';
import { IonItem, IonLabel, IonGrid, IonCol, IonRow } from '@ionic/angular/standalone';
import { AsyncPipe } from '@angular/common';
import { addIcons } from 'ionicons';
import { homeOutline } from 'ionicons/icons';
import { DataService } from 'src/app/services/data/data';

@Component({
  selector: 'app-flights-page',
  templateUrl: 'flights.component.html',
  styleUrls: ['flights.component.scss'],
  imports: [AsyncPipe, IonItem, IonLabel, IonGrid, IonCol, IonRow],
})
export class FlightsComponent {

  private dataService = inject(DataService);
  public signingOut = false;
  public flights$ = this.dataService.flights$;

  constructor() {
     addIcons({homeOutline});
  }

}
