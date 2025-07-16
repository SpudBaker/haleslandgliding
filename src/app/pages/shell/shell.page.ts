import { Component } from '@angular/core';
import { IonContent, IonCol, IonRow, IonGrid } from '@ionic/angular/standalone';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "src/app/components/header/header";
import { NavMainComponent } from 'src/app/components/nav-main/nav-main';

@Component({
  selector: 'app-shell-page',
  templateUrl: 'shell.page.html',
  styleUrls: ['shell.page.scss'],
  imports: [IonContent, IonCol, IonRow, IonGrid, RouterOutlet, HeaderComponent, NavMainComponent]
})
export class ShellPage {

  constructor() {}

}
