import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { fromEvent } from 'rxjs/internal/observable/fromEvent';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class GeneralService {

private latestIsMobile = false;
public mobile$ = new ReplaySubject<boolean>(1);
private readonly mobileWidth = 600;

constructor(){
  this.mobile$.next(window.innerWidth < this.mobileWidth);
  fromEvent(window, 'resize').pipe(
    map(event => {
      const win: Window = event.target as Window;
      const isMobile = (win.innerWidth < this.mobileWidth);
      if(isMobile != this.latestIsMobile){
        this.latestIsMobile = isMobile;
        this.mobile$.next(isMobile); 
      }
    })
  ).subscribe();

}

}