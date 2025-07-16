import { Component, inject } from '@angular/core';
import { IonItem, IonLabel, IonGrid, IonCol, IonRow } from '@ionic/angular/standalone';
import { AsyncPipe } from '@angular/common';
import { DataService } from 'src/app/services/data/data';

@Component({
  selector: 'app-accounts-page',
  templateUrl: 'accounts.component.html',
  styleUrls: ['accounts.component.scss'],
  imports: [AsyncPipe, IonItem, IonLabel, IonGrid, IonCol, IonRow],
})
export class AccountsComponent {

  private dataService = inject(DataService);
  public accounts$ = this.dataService.accounts$;

}
