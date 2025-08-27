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
  public giftAidDetail$ = new ReplaySubject<Globals.GiftAidDetailFrontEnd[] | null>(1);
  public giftAidSummary$ = new ReplaySubject<Globals.GiftAidSummaryFrontEnd[] | null>(1);
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
        console.log('api data', data);
        this.accounts$.next(this.extractAccounts(data[1]));
        this.flights$.next(this.extractFlights(data[0]));
        this.member$.next(this.extractMember(data[2]));
        this.giftAidSummary$.next(this.extractGiftAidSummary(data[3]));
        this.giftAidDetail$.next(this.extractGiftAidDetail(data[4]));
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

  private extractGiftAidDetail(data: Object): Globals.GiftAidDetailFrontEnd[] {
    const arr = new Array<Globals.GiftAidDetailFrontEnd>();
    const giftAidDetail = data as GlobalsBackEnd.GiftAidDetailBackEnd[];
    giftAidDetail.forEach(g => {
      arr.push(new Globals.GiftAidDetailFrontEnd(+g.CarMiles, g.Passenger, g.Motorcycle,
        g.Cycle, g.BusTrain, new Date(g.Date), g.DutyComment, g.MemberRef, new Date(g.Attended),
        g.MemberNumber, g.MemberName, g.PostCode, +g.Mileage, +g.Flights, +g.P1Flights,
        +g.PUIP2Flights, +g.P1Paid, +g.P2Paid, +g.SharedCost, +g.OtherPaid));
    });
    return arr;
  }
  
  private extractGiftAidSummary(data: Object): Globals.GiftAidSummaryFrontEnd[] {
    const arr = new Array<Globals.GiftAidSummaryFrontEnd>();
    const giftAidSummary = data as GlobalsBackEnd.GiftAidSummaryBackEnd[];
    giftAidSummary.forEach(g => {
      arr.push(new Globals.GiftAidSummaryFrontEnd(g.MemberRef, g.MemberNumber,
        g.MemberName, new Date(g.FromDate), new Date(g.ToDate), +g.ClaimDays,
        g.PostCode, +g.RoundTripMileage, g.VehicleType, +g.PotentialClaimValue));
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