import { Component } from '@angular/core';
import { IonItem, IonLabel, IonGrid, IonCol, IonRow, IonContent, IonButton, IonImg, IonText, LoadingController, NavController} from '@ionic/angular/standalone';
import { AsyncPipe, CurrencyPipe } from '@angular/common';
import { inject } from '@angular/core';
import { DataService } from 'src/app/services/data/data';

@Component({
  selector: 'app-component-page',
  templateUrl: 'user.component.html',
  styleUrls: ['user.component.scss'],
  imports: [AsyncPipe, CurrencyPipe, IonItem, IonLabel, IonGrid, IonCol, IonRow],
})
export class UserComponent {

  private dataService = inject(DataService);
  public signingOut = false;
  public member$ = this.dataService.member$;

  constructor() {
  }

}
