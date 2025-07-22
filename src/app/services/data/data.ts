import { Injectable } from '@angular/core';
import { AlertController, AlertOptions } from '@ionic/angular/standalone';
import { Observable, of, ReplaySubject} from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
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

  public callFunction(email: string):Observable<boolean>{
    if(this.initiated){return of(true)};
    const url = 'https://getglidexfiles-iw4pdarncq-uc.a.run.app?email='+email;
    const callable = httpsCallableFromURL(this.firebaseFunctions,  url);
    const opts: AlertOptions = {
      message: "Retrieving your data, this can take a few moments, please wait...."
    }
    return from(this.alertController.create(opts)).pipe(
      switchMap(lc => lc.present()),
      switchMap(() => callable()),
      switchMap(d => {
        this.initiated = true;
        const data = d.data as Array<any>;
        this.accounts$.next(this.extractAccounts(data[1]));
        this.flights$.next(this.extractFlights(data[0]));
        this.member$.next(this.extractMember(data[2]));
        return this.alertController.dismiss();
      }),
      catchError(err =>{
        return of(this.alertController.dismiss()).pipe(
          switchMap(() => {
            let  message = '';
            switch(err.code){
              case('functions/unauthenticated'):
                message = 'the email for this user is not authorised';
                break;
              default:
                message = 'unknown error';
            }
            const errorOpts: AlertOptions = {
              message
            }
            return this.alertController.create(errorOpts)
          }),
          switchMap(ac => ac.present()),
          map(() => true)
        )
      })
    );
  }

 private extractAccounts(data: Object): Globals.TransactionFrontEnd[] {
    const arr = new Array<Globals.TransactionFrontEnd>();
    const accounts = data as GlobalsBackEnd.TransactionBackEnd[];
    accounts.forEach(t => {
      arr.push(new Globals.TransactionFrontEnd(t.Reference, t.TransactionType,
        new Date(t.TransactionDate), t.MemberRef, t.Member, t.Charges, t.Payment,
        t.Notes));
    });
    return arr;
  }

  private extractFlights(data: Object): Globals.FlightFrontEnd[] {
    const arr = new Array<Globals.FlightFrontEnd>();
    const flights = data as GlobalsBackEnd.FlightBackEnd[];
    flights.forEach(f => {
      arr.push(new Globals.FlightFrontEnd(f.Ref, f.P1Ref, f.P2Ref, f.ChargeToText,
        new Date(f.FlightDate), f.Glider, f.TakeOff, f.Duration, f.Type, f.FlightType,
        f.P1, f.P2,f.Notes, f.ChargeToRef));
    });
    return arr;
  }
  
  private extractMember(data: Object): Globals.MemberFrontEnd {
    const m = data as GlobalsBackEnd.MemberBackEnd;
    return new Globals.MemberFrontEnd(m.Ref, m.MemberType, m.MembershipNo, m.Name,
      m.Postcode, m.TelMobile, m.TelHome, m.EMail, m.EmergencyContact, new Date(m.DateJoined),
      new Date(m.MembershipExpires), m.LapsedMember, Globals.convertStringToDate(m.MedicalValidTo),
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