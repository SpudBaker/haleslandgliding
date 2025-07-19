import { Component, inject } from '@angular/core';
import { IonContent, IonCol, IonRow, IonGrid } from '@ionic/angular/standalone';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "src/app/components/header/header";
import { NavMainComponent } from 'src/app/components/nav-main/nav-main';
import { AuthService } from 'src/app/services/auth/auth';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-shell-page',
  templateUrl: 'shell.page.html',
  styleUrls: ['shell.page.scss'],
  imports: [IonContent, IonCol, IonRow, IonGrid, RouterOutlet, HeaderComponent, NavMainComponent]
})
export class ShellPage {

  private auth = inject(AuthService);
  public headerText = '';

  constructor() {
    this.auth.selectedRoute.pipe(
      map(text => this.headerText = text)
    ).subscribe();
  }

}
