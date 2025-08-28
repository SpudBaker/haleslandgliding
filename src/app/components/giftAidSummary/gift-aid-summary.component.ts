import { Component, inject } from '@angular/core';
import { IonButton, IonItem, IonLabel, IonGrid, IonCol, IonRow } from '@ionic/angular/standalone';
import { AsyncPipe, CurrencyPipe } from '@angular/common';
import { addIcons } from 'ionicons';
import { homeOutline } from 'ionicons/icons';
import { DataService } from 'src/app/services/data/data';
import { first, map } from 'rxjs/operators';

@Component({
  selector: 'app-gift-aid-summary-page',
  templateUrl: 'gift-aid-summary.component.html',
  styleUrls: ['gift-aid-summary.component.scss'],
  imports: [AsyncPipe, CurrencyPipe, IonButton, IonItem, IonLabel, IonGrid, IonCol, IonRow],
})
export class GiftAidSummaryComponent {

  private dataService = inject(DataService);
  public signingOut = false;
  public giftAidSummary$ = this.dataService.giftAidSummary$;

  constructor() {
     addIcons({homeOutline});
  }

  public downloadButtonPress(){
    this.giftAidSummary$.pipe(
      first(),
      map(sum => {
        const headerRow = '"MemberRef", "MemberNumber", "MemberName", "FromDate", "ToDate", "ClaimDays", "PostCode", "RoundTripMileage", "VehicleType", "PotentialClaimValue"\n';
        const summaryRow = '"'+sum?.MemberRef+'","'+sum?.MemberNumber+'","'+sum?.MemberName+'","'+sum?.FromDate.toLocaleDateString()+'","'+
        sum?.ToDate.toLocaleDateString()+'","'+sum?.ClaimDays+'","'+sum?.PostCode+'","'+sum?.RoundTripMileage+'","'+
        sum?.VehicleType+'","'+sum?.PotentialClaimValue+'"\n';
        this.download('giftAidSummary', headerRow+summaryRow);
      })
    ).subscribe();
  }

  private download(filename: string, data: any) {
    let link = document.createElement('a');
    link.download = filename;
    let blob = new Blob([data], { type: 'text/csv' });
    link.href = URL.createObjectURL(blob);
    link.click();
    URL.revokeObjectURL(link.href);
  }

}
