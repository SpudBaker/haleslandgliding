import { Component, inject } from '@angular/core';
import { IonItem, IonLabel, IonGrid, IonCol, IonRow } from '@ionic/angular/standalone';
import { AsyncPipe, CurrencyPipe } from '@angular/common';
import { addIcons } from 'ionicons';
import { homeOutline } from 'ionicons/icons';
import { DataService } from 'src/app/services/data/data';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-gift-aid-summary-page',
  templateUrl: 'gift-aid-summary.component.html',
  styleUrls: ['gift-aid-summary.component.scss'],
  imports: [AsyncPipe, CurrencyPipe, IonItem, IonLabel, IonGrid, IonCol, IonRow],
})
export class GiftAidSummaryComponent {

  private dataService = inject(DataService);
  public signingOut = false;
  public giftAidSummary$ = this.dataService.giftAidSummary$.pipe(tap(data=> console.log(data)))

  constructor() {
     addIcons({homeOutline});
  }

}
