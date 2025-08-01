import { Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { IonHeader, IonImg, IonGrid, IonRow, IonCol } from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { AuthService } from 'src/app/services/auth/auth';
import { DataService } from 'src/app/services/data/data';
import { GeneralService } from 'src/app/services/general/general';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  imports: [AsyncPipe, CommonModule, IonHeader, IonImg, IonGrid, IonRow, IonCol],
  templateUrl: './header.html',
  styleUrl: './header.scss',
  providers: []
})

export class HeaderComponent {

  private auth = inject(AuthService);
  public text = '';
  private data = inject(DataService);
  private general = inject(GeneralService);
  public mobile$ = this.general.mobile$;
  public member$ = this.data.member$;

  constructor(){
    this.auth.selectedRoute.pipe(
      map(text => this.text = text)
    ).subscribe();
  }

}
