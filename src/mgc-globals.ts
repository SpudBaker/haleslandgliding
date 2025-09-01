
import { AuthService } from './app/services/auth/auth';
import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { NavController } from '@ionic/angular';
import { of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { DataService } from './app/services/data/data';

export enum routes {
    ACCOUNT = 'account',
    FLIGHTS = 'flights',
    GIFTAIDSUMMARY = 'giftAidSummary',
    LOGIN = 'login',
    MEMBERSHIP = 'membership',
}

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
                    return dataService.callFunction(user.email.toLowerCase()).pipe(
                        map(() => true)
                    )
                } else {
                    navController.navigateRoot('shell/login');
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
                    navController.navigateRoot('shell/user');
                return of(false);
                }
            })
        )
    }
}

export function convertStringToDate(d: string): Date | null {
    const timestamp = Date.parse('foo');
    if (isNaN(timestamp) == false) {
        return new Date(timestamp);
    } else {
        return null;
    }
}

/**
 ** Class to represent a Flight
 */
export class FlightFrontEnd {
  readonly Ref: string;
  readonly P1Ref: string;
  readonly P2Ref: string;
  readonly ChargeToText: string;
  readonly FlightDate: Date;
  readonly Glider: string;
  readonly TakeOff: string;
  readonly Duration: string;
  readonly Type: string;
  readonly FlightType: string;
  readonly P1: string;
  readonly P2: string;
  readonly Notes: string;
  readonly ChargeToRef: string;
  /**
  * Class constructor
  * @param {string} Ref
  * @param {string} P1Ref
  * @param {string} P2Ref
  * @param {string} ChargeToText
  * @param {Date} FlightDate
  * @param {string} Glider
  * @param {string} TakeOff
  * @param {string} Duration
  * @param {string} Type
  * @param {string} FlightType
  * @param {string} P1
  * @param {string} P2
  * @param {string} Notes
  * @param {string} ChargeToRef
  */
  constructor(Ref: string, P1Ref: string, P2Ref: string, ChargeToText: string,
    FlightDate: Date, Glider: string, TakeOff: string, Duration: string,
    Type: string, FlightType: string, P1: string, P2: string,
    Notes: string, ChargeToRef: string) {
    this.Ref = Ref;
    this.P1Ref = P1Ref;
    this.P2Ref = P2Ref;
    this.ChargeToText = ChargeToText;
    this.FlightDate = FlightDate;
    this.Glider = Glider;
    this.TakeOff = TakeOff;
    this.Duration = Duration;
    this.Type = Type;
    this.FlightType = FlightType;
    this.P1 = P1;
    this.P2 = P2;
    this.Notes = Notes;
    this.ChargeToRef = ChargeToRef
  }
}

/**
 * Class to represent a Gift Aid Detail.
 */
export class GiftAidDetailFrontEnd {
  readonly CarMiles: number;
  readonly Passenger: string;
  readonly Motorcycle: string;
  readonly Cycle: string;
  readonly BusTrain: string;
  readonly Date: Date;
  readonly DutyComment: string;
  readonly MemberRef: string;
  readonly Attended: Date;
  readonly MemberNumber: string;
  readonly MemberName: string;
  readonly PostCode: string;
  readonly Mileage: number;
  readonly Flights: number;
  readonly P1Flights: number;
  readonly PUIP2Flights: number;
  readonly P1Paid: number;
  readonly P2Paid: number;
  readonly SharedCost: number;
  readonly OtherPaid: number;
  readonly Comments: string;
  /**
  * Class constructor
  * @param {number} CarMiles
  * @param {string} Passenger
  * @param {string} Motorcycle
  * @param {string} Cycle
  * @param {string} BusTrain
  * @param {Date} Date
  * @param {string} DutyComment
  * @param {string} MemberRef
  * @param {Date} Attended
  * @param {string} MemberNumber
  * @param {string} MemberName
  * @param {string} PostCode
  * @param {number} Mileage
  * @param {number} Flights
  * @param {number} P1Flights
  * @param {number} PUIP2Flights
  * @param {number} P1Paid
  * @param {number} P2Paid
  * @param {number} SharedCost
  * @param {number} OtherPaid
  * @param {string} Comments
  */
  constructor(CarMiles: number, Passenger: string, Motorcycle: string,
    Cycle: string, BusTrain: string, Date: Date, DutyComment: string,
    MemberRef: string, Attended: Date, MemberNumber: string,
    MemberName: string, PostCode: string, Mileage: number, Flights: number,
    P1Flights: number, PUIP2Flights: number, P1Paid: number, P2Paid: number,
    SharedCost: number, OtherPaid: number, Comments: string) {
    this.CarMiles = CarMiles;
    this.Passenger = Passenger;
    this.Motorcycle = Motorcycle;
    this.Cycle = Cycle;
    this.BusTrain = BusTrain;
    this.Date = Date;
    this.DutyComment = DutyComment;
    this.MemberRef = MemberRef;
    this.Attended = Attended;
    this.MemberNumber = MemberNumber;
    this.MemberName = MemberName;
    this.PostCode = PostCode;
    this.Mileage = Mileage;
    this.Flights = Flights;
    this.P1Flights = P1Flights;
    this.PUIP2Flights = PUIP2Flights;
    this.P1Paid = P1Paid;
    this.P2Paid = P2Paid;
    this.SharedCost = SharedCost;
    this.OtherPaid = OtherPaid;
    this.Comments = Comments;
  }
}

/**
 * Class to represent a Gift Aid Summary.
 */
export class GiftAidSummaryFrontEnd {
  readonly MemberRef: string;
  readonly MemberNumber: string;
  readonly MemberName: string;
  readonly FromDate: Date;
  readonly ToDate: Date;
  readonly ClaimDays: number;
  readonly PostCode: string;
  readonly RoundTripMileage: number;
  readonly VehicleType: string;
  readonly PotentialClaimValue: number;
  /**
  * Class constructor
  * @param {string} MemberRef
  * @param {string} MemberNumber
  * @param {string} MemberName
  * @param {Date} FromDate
  * @param {Date} ToDate
  * @param {number} ClaimDays
  * @param {string} PostCode
  * @param {number} RoundTripMileage
  * @param {string} VehicleType
  * @param {number} PotentialClaimValue
  */
  constructor(MemberRef: string, MemberNumber: string, MemberName: string,
    FromDate: Date, ToDate: Date, ClaimDays: number, PostCode: string,
    RoundTripMileage: number, VehicleType: string,
    PotentialClaimValue: number) {
    this.MemberRef = MemberRef;
    this.MemberNumber = MemberNumber;
    this.MemberName = MemberName;
    this.FromDate = FromDate;
    this.ToDate = ToDate;
    this.ClaimDays= ClaimDays;
    this.PostCode = PostCode;
    this.RoundTripMileage = RoundTripMileage;
    this.VehicleType = VehicleType;
    this.PotentialClaimValue = PotentialClaimValue;
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
    readonly MedicalValidTo: Date | null;
    readonly AFRDue: Date;
    readonly GiftAidMiles: number;
    readonly ChargeToName: string;
    readonly LatestBalance: number;
    readonly DateLastFlight: Date;
    constructor(Ref: string, MemberType: string, MembershipNo: string, Name: string, Postcode: string, TelMobile: string,
        TelHome: string, EMail: string, EmergencyContact: string, DateJoined: Date, MembershipExpires: Date,
        LapsedMember: boolean, MedicalValidTo: Date | null, AFRDue: Date, GiftAidMiles: number, ChargeToName: string,
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
