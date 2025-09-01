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
  private giftAidDetail$ = this.dataService.giftAidDetail$;

  constructor() {
     addIcons({homeOutline});
  }

  public downloadGiftAidForm(){
    this.giftAidDetail$.pipe(
      first(),
      map(details => {
        const headerRow = '"CarMiles","Passenger","Motorcycle","Cycle","Bus/Train","Date","Duty/Comment"\n';
        let firstDetailRow = true;
        let detailRows = '';
        details?.forEach(d => {
          const detailRow = '"'+d.CarMiles+'","'+d.Passenger+'","'+d.Motorcycle+'","'+d.Cycle+'","'+d.BusTrain+'","'+
          d.Date.toLocaleDateString()+'","'+d.DutyComment+'"';
          if(firstDetailRow){
            detailRows = detailRow;
            firstDetailRow = false;
          } else {
            detailRows = detailRows + '\n' + detailRow;
          }
        })
        this.download('giftAidFormData', headerRow+detailRows);
      })
    ).subscribe();
  }

  public downloadSupplementary(){
    this.giftAidDetail$.pipe(
      first(),
      map(details => {
        const headerRow = '"Member Ref","Attended","Member Number","Member Name","Post Code","Mileage","Flights",' +
        '"P1 Flights","P2 Flights","P1 Paid","Shared Cost","Other Paid","Comments"\n';
        let firstDetailRow = true;
        let detailRows = '';
        details?.forEach(d => {
          const detailRow = '"'+d.MemberRef+'","'+d.Attended+'","'+d.MemberNumber+'","'+d.MemberName+'","'+d.PostCode+'","'+d.Mileage+
          '","'+d.Flights+'","'+d.P1Flights+'","'+d.P1Paid+'","'+d.P2Paid+'","'+d.SharedCost+'","'+d.OtherPaid+'","'+d.Comments+'"';
          if(firstDetailRow){
            detailRows = detailRow;
            firstDetailRow = false;
          } else {
            detailRows = detailRows + '\n' + detailRow;
          }
        })
        this.download('giftAidSupplementary', headerRow+detailRows);
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
