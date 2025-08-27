import { Component, inject } from '@angular/core';
import { IonItem, IonLabel, IonGrid, IonCol, IonRow } from '@ionic/angular/standalone';
import { AsyncPipe } from '@angular/common';
import { addIcons } from 'ionicons';
import { homeOutline } from 'ionicons/icons';
import { DataService } from 'src/app/services/data/data';

@Component({
  selector: 'app-gift-aid-summary-page',
  templateUrl: 'gift-aid-summary.component.html',
  styleUrls: ['gift-aid-summary.component.scss'],
  imports: [AsyncPipe, IonItem, IonLabel, IonGrid, IonCol, IonRow],
})
export class GiftAidSummaryComponent {

  private dataService = inject(DataService);
  public signingOut = false;
  public giftAidSummary$ = this.dataService.giftAidSummary$;

  constructor() {
     addIcons({homeOutline});
  }

}
