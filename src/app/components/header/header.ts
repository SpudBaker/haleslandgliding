import { Component, inject } from '@angular/core';
import { IonImg, IonGrid, IonRow, IonCol } from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { AuthService } from 'src/app/services/auth/auth';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  imports: [CommonModule, IonImg, IonGrid, IonRow, IonCol],
  templateUrl: './header.html',
  styleUrl: './header.scss',
  providers: []
})

export class HeaderComponent {

  private auth = inject(AuthService);
  public text = 'initial text';

  constructor(){
    this.auth.selectedRoute.pipe(
      map(text => this.text = text)
    ).subscribe();
  }

}
