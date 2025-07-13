import { Injectable } from '@angular/core';
import { AlertController, AlertOptions } from '@ionic/angular/standalone';
import { Observable, of, ReplaySubject} from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import * as Globals from '../../../mgc-globals';
import { Functions, httpsCallableFromURL } from '@angular/fire/functions';
import { inject } from '@angular/core';
import { from } from 'rxjs/internal/observable/from';

@Injectable({
  providedIn: 'root'
})

export class DataService {

  private alertController = inject(AlertController);
  private initiated = false;
  public accounts$ = new ReplaySubject<Globals.TransactionFrontEnd[] | null>(1);
  public flights$ = new ReplaySubject<Globals.FlightFrontEnd[] | null>(1);
  public member$ = new ReplaySubject<Globals.MemberFrontEnd | null>(1);
  private firebaseFunctions: Functions = inject(Functions);

  public callFunction(email: string):Observable<void>{
    if(this.initiated){return of(undefined)};
    const url = 'https://getglidexfiles-iw4pdarncq-uc.a.run.app?email='+email;
    const callable = httpsCallableFromURL(this.firebaseFunctions,  url);
    const opts: AlertOptions = {
      message: "Retrieving your data, this can take a few moments, please wait...."
    }
    return from(this.alertController.create(opts)).pipe(
      switchMap(lc => lc.present()),
      switchMap(() => callable()),
      map(d => {
        this.initiated = true;
        const data = d.data as Array<any>;
        console.log(data);
        this.accounts$.next(this.extractAccounts(data[0]));
        this.flights$.next(this.extractFlights(data[1]));
        this.member$.next(this.extractMember(data[2]));
        this.alertController.dismiss();
      })
    );
  }

  private extractAccounts(data: Array<string>): Globals.TransactionFrontEnd[] {
    const arr = new Array<Globals.TransactionFrontEnd>();
    data.forEach(t => {
      arr.push(new Globals.TransactionFrontEnd(t[0],t[1],new Date(t[2]), t[3], t[4], t[5], t[6], t[7]));
    })
    return arr;
  }

  private extractFlights(data: Array<string>): Globals.FlightFrontEnd[] {
    const arr = new Array<Globals.FlightFrontEnd>();
    data.forEach(t => {
      arr.push(new Globals.FlightFrontEnd(t[0],t[1],t[2],t[3],new Date(t[4]),t[5],t[6],t[7],t[8],t[9],t[10],t[11],t[12]));
    })
    return arr;
  }
  
  private extractMember(t: Array<string>): Globals.MemberFrontEnd {
    return new Globals.MemberFrontEnd(t[0],t[1],t[2],t[3],t[4],t[5],t[6],t[7],t[8],
      new Date(t[9]),new Date(t[10]),(t[11] as string)=="true"?true:false,
      new Date(t[12]), new Date(t[13]), +t[14], t[15], +t[16], new Date(t[17]));
  }

  public resetLogOut(){
    this.initiated = false;
    this.accounts$ = new ReplaySubject<Globals.TransactionFrontEnd[] | null>(1);
    this.flights$ = new ReplaySubject<Globals.FlightFrontEnd[] | null>(1);
    this.member$ = new ReplaySubject<Globals.MemberFrontEnd | null>(1);
  }
}