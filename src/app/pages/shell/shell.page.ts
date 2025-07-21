import { Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { IonContent, IonCol, IonRow, IonGrid } from '@ionic/angular/standalone';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "src/app/components/header/header";
import { NavMainComponent } from 'src/app/components/nav-main/nav-main';
import { AuthService } from 'src/app/services/auth/auth';
import { map } from 'rxjs/operators';
import { GeneralService } from 'src/app/services/general/general';

@Component({
  selector: 'app-shell-page',
  templateUrl: 'shell.page.html',
  styleUrls: ['shell.page.scss'],
  imports: [AsyncPipe, IonContent, IonCol, IonRow, IonGrid, RouterOutlet, HeaderComponent, NavMainComponent]
})
export class ShellPage {

  private auth = inject(AuthService);
  private general = inject(GeneralService);
  public headerText = '';
  public mobile$ = this.general.mobile$;

  constructor() {
    this.auth.selectedRoute.pipe(
      map(text => this.headerText = text)
    ).subscribe();
  }

}
