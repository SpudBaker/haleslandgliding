import { bootstrapApplication } from '@angular/platform-browser';
import { RouteReuseStrategy, provideRouter, withPreloading, PreloadAllModules } from '@angular/router';
import { IonicRouteStrategy, provideIonicAngular } from '@ionic/angular/standalone';

import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';

import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getAnalytics, provideAnalytics, ScreenTrackingService, UserTrackingService } from '@angular/fire/analytics';
import { getFunctions, provideFunctions } from '@angular/fire/functions';


bootstrapApplication(AppComponent, {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideIonicAngular(),
    provideRouter(routes, withPreloading(PreloadAllModules)),
    provideFirebaseApp(() => 
      initializeApp({
        projectId: "glidexmemberview",
        appId: "1:220748600918:web:606cab724dd9b2d7b28df7",
        storageBucket: "glidexmemberview.firebasestorage.app",
        apiKey: "AIzaSyDrTS1vhWxb2JZkBpXqQQWpns6LhzXZbhI",
        authDomain: "glidexmemberview.firebaseapp.com",
        messagingSenderId: "220748600918",
        measurementId: "G-ZLDRT5WMCY"
      })),
    provideAuth(() => getAuth()),
    ScreenTrackingService,
    UserTrackingService,
    provideAnalytics(() => getAnalytics()),
    provideFunctions(() => getFunctions())
  ],
  
});
