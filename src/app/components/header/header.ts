import { Component } from '@angular/core';
import { IonImg, IonGrid, IonRow, IonCol } from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  imports: [CommonModule, IonImg, IonGrid, IonRow, IonCol],
  templateUrl: './header.html',
  styleUrl: './header.scss',
  providers: []
})
export class HeaderComponent {}
