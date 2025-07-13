import { Injectable } from '@angular/core';
import { AlertController, AlertOptions } from '@ionic/angular/standalone';
import { Observable, of, ReplaySubject} from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import * as Globals from '../../../mgc-globals';
import * as GlobalsBackEnd from '../../../../functions/src/classes';
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
        this.flights$.next(this.extractFlights(data[0]));
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

  private extractFlights(data: Object): Globals.FlightFrontEnd[] {
    const arr = new Array<Globals.FlightFrontEnd>();
    const flights = data as GlobalsBackEnd.FlightBackEnd[];
    flights.forEach(f => {
      arr.push(new Globals.FlightFrontEnd(f.Ref, f.P1Ref, f.P2Ref, f.ChargeToRef,
        new Date(f.FlightDate), f.Glider, f.TakeOff, f.Duration, f.Type, f.FlightType,
        f.P1, f.P2,f.Notes));
    });
    return arr;
  }
  
  private extractMember(data: Object): Globals.MemberFrontEnd {
    const m = data as GlobalsBackEnd.MemberBackEnd;
    return new Globals.MemberFrontEnd(m.Ref, m.MemberType, m.MembershipNo, m.Name,
      m.Postcode, m.TelMobile, m.TelHome, m.EMail, m.EmergencyContact, new Date(m.DateJoined),
      new Date(m.MembershipExpires), m.LapsedMember, new Date(m.MedicalValidTo),
      new Date(m.AFRDue), m.GiftAidMiles, m.ChargeToName, +m.LatestBalance, new Date(m.DateLastFlight)
    );
  }

  public resetLogOut(){
    this.initiated = false;
    this.accounts$ = new ReplaySubject<Globals.TransactionFrontEnd[] | null>(1);
    this.flights$ = new ReplaySubject<Globals.FlightFrontEnd[] | null>(1);
    this.member$ = new ReplaySubject<Globals.MemberFrontEnd | null>(1);
  }
}