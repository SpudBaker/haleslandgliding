
import { AuthService } from './app/services/auth/auth';
import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { NavController } from '@ionic/angular';
import { of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

export namespace AuthGuard {
    export const canActivateLoggedIn = (
        route: ActivatedRouteSnapshot, 
        state: RouterStateSnapshot
    ) => {
        const authService = inject(AuthService);
        const navController = inject(NavController);

        return authService.user$.pipe(
            switchMap(user => {
                if(user?.email){
                    return of(true);
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

export class Member {
    readonly Ref: string;
    readonly MemberType_ref: string;
    readonly Membership_No: string;
    readonly Name: string;
    readonly Postcode: string;
    readonly Tel_Mobile: string;
    readonly EMail: string;
    readonly Emergency_Contact: string;
    readonly Date_Joined: Date;
    readonly Membership_Expires: Date;
    readonly Date_Lapsed: Date | undefined;
    readonly Lapsed_Member: boolean;
    readonly Medical_ValidTo: Date | undefined;
    readonly AFR_Due: Date;
    readonly RoundTrip_Mileage: number;
    readonly ChargeTo_ref: string;
    readonly BalLastMonthEnd: number;
    readonly DateLastFlight: Date;
    constructor(Ref: string, MemberType_ref: string, Membership_No: string, Name: string, Postcode: string, Tel_Mobile: string,
        EMail: string, Emergency_Contact: string, Date_Joined: Date, Membership_Expires: Date, Date_Lapsed: Date | undefined,
        Lapsed_Member: boolean, Medical_ValidTo: Date | undefined, AFR_Due: Date, RoundTrip_Mileage: number, ChargeTo_ref: string,
        BalLastMonthEnd: number, DateLastFlight: Date){
            this.Ref = Ref,
            this.MemberType_ref = MemberType_ref;
            this.Membership_No = Membership_No;
            this.Name = Name;
            this.Postcode = Postcode;
            this.Tel_Mobile = Tel_Mobile;
            this.EMail = EMail;
            this.Emergency_Contact = Emergency_Contact;
            this.Date_Joined = Date_Joined;
            this.Membership_Expires = Membership_Expires;
            this.Date_Lapsed = Date_Lapsed;
            this.Lapsed_Member = Lapsed_Member;
            this.Medical_ValidTo= Medical_ValidTo;
            this.AFR_Due = AFR_Due;
            this.RoundTrip_Mileage = RoundTrip_Mileage;
            this.ChargeTo_ref = ChargeTo_ref;
            this.BalLastMonthEnd = BalLastMonthEnd;
            this.DateLastFlight = DateLastFlight;
    }
}