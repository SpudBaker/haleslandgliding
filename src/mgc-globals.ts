
import { AuthService } from './app/services/auth/auth';
import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { NavController } from '@ionic/angular';
import { of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { DataService } from './app/services/data/data';

export namespace AuthGuard {
    export const canActivateLoggedIn = (
        route: ActivatedRouteSnapshot, 
        state: RouterStateSnapshot
    ) => {
        const authService = inject(AuthService);
        const dataService = inject(DataService);
        const navController = inject(NavController);

        return authService.user$.pipe(
            switchMap(user => {
                if(user?.email){
                    return dataService.callFunction(user.email).pipe(
                        map(() => true)
                    )
                } else {
                    navController.navigateRoot('home');
                return of(false);
                }
            })
        )
    }
    export const canActivateLoggedOut = (
        route: ActivatedRouteSnapshot, 
        state: RouterStateSnapshot
    ) => {
        const authService = inject(AuthService);
        const navController = inject(NavController);

        return authService.user$.pipe(
            switchMap(user => {
                if(!user?.email){
                    return of(true);
                } else {
                    navController.navigateRoot('user');
                return of(false);
                }
            })
        )
    }
}

/**
 ** Class to represent a Flight
 */
export class FlightFrontEnd {
  readonly Ref: string;
  readonly P1Ref: string;
  readonly P2Ref: string;
  readonly ChargeToRef: string;
  readonly FlightDate: Date;
  readonly Glider: string;
  readonly TakeOff: string;
  readonly Duration: string;
  readonly Type: string;
  readonly FlightType: string;
  readonly P1: string;
  readonly P2: string;
  readonly Notes: string;
  /**
  * Class constructor
  * @param {string} Ref
  * @param {string} P1Ref
  * @param {string} P2Ref
  * @param {string} ChargeToRef
  * @param {Date} FlightDate
  * @param {string} Glider
  * @param {string} TakeOff
  * @param {string} Duration
  * @param {string} Type
  * @param {string} FlightType
  * @param {string} P1
  * @param {string} P2
  * @param {string} Notes
  */
  constructor(Ref: string, P1Ref: string, P2Ref: string, ChargeToRef: string,
    FlightDate: Date, Glider: string, TakeOff: string, Duration: string,
    Type: string, FlightType: string, P1: string, P2: string,
    Notes: string) {
    this.Ref = Ref;
    this.P1Ref = P1Ref;
    this.P2Ref = P2Ref;
    this.ChargeToRef = ChargeToRef;
    this.FlightDate = FlightDate;
    this.Glider = Glider;
    this.TakeOff = TakeOff;
    this.Duration = Duration;
    this.Type = Type;
    this.FlightType = FlightType;
    this.P1 = P1;
    this.P2 = P2;
    this.Notes = Notes;
  }
}

export class MemberFrontEnd {
    readonly Ref: string;
    readonly MemberType: string;
    readonly MembershipNo: string;
    readonly Name: string;
    readonly Postcode: string;
    readonly TelMobile: string;
    readonly TelHome: string;
    readonly EMail: string;
    readonly EmergencyContact: string;
    readonly DateJoined: Date;
    readonly MembershipExpires: Date;
    readonly LapsedMember: boolean;
    readonly MedicalValidTo: Date;
    readonly AFRDue: Date;
    readonly GiftAidMiles: number;
    readonly ChargeToName: string;
    readonly LatestBalance: number;
    readonly DateLastFlight: Date;
    constructor(Ref: string, MemberType: string, MembershipNo: string, Name: string, Postcode: string, TelMobile: string,
        TelHome: string, EMail: string, EmergencyContact: string, DateJoined: Date, MembershipExpires: Date,
        LapsedMember: boolean, MedicalValidTo: Date, AFRDue: Date, GiftAidMiles: number, ChargeToName: string,
        LatestBalance: number, DateLastFlight: Date){
            this.Ref = Ref,
            this.MemberType = MemberType;
            this.MembershipNo = MembershipNo;
            this.Name = Name;
            this.Postcode = Postcode;
            this.TelMobile = TelMobile;
            this.TelHome = TelHome
            this.EMail = EMail;
            this.EmergencyContact = EmergencyContact;
            this.DateJoined = DateJoined;
            this.MembershipExpires = MembershipExpires;
            this.LapsedMember = LapsedMember;
            this.MedicalValidTo= MedicalValidTo;
            this.AFRDue = AFRDue;
            this.GiftAidMiles = GiftAidMiles;
            this.ChargeToName = ChargeToName;
            this.LatestBalance = LatestBalance;
            this.DateLastFlight = DateLastFlight;
    }
}

/**
 ** Class to represent a Flight
 */
export class TransactionFrontEnd {
  readonly Reference: string;
  readonly TransactionType: string;
  readonly TransactionDate: Date;
  readonly MemberRef: string;
  readonly Member: string;
  readonly Charges: string;
  readonly Payment: string;
  readonly Notes: string;
  /**
  * Class constructor
  * @param {string} Reference
  * @param {string} TransactionType
  * @param {Date} TransactionDate
  * @param {string} MemberRef
  * @param {string} Member
  * @param {string} Charges
  * @param {string} Payment
  * @param {string} Notes
  */
  constructor(Reference: string, TransactionType: string,
    TransactionDate: Date, MemberRef: string, Member: string, Charges: string,
    Payment: string, Notes: string) {
    this.Reference = Reference;
    this.TransactionType = TransactionType;
    this.TransactionDate = TransactionDate;
    this.MemberRef = MemberRef;
    this.Member = Member;
    this.Charges = Charges;
    this.Payment = Payment;
    this.TransactionDate = TransactionDate;
    this.Notes = Notes;
  }
}
