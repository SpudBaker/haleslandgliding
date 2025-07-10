
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
    readonly MemberType: string;
    readonly MembershipNo: string;
    readonly Name: string;
    readonly Postcode: string;
    readonly TelMobile: string;
    readonly TelHome: string;
    readonly EMail: string;
    readonly EmergencyContact: string;
    readonly DateJoined: string;
    readonly MembershipExpires: string;
    readonly LapsedMember: boolean;
    readonly MedicalValidTo: string;
    readonly AFRDue: string;
    readonly GiftAidMiles: number;
    readonly ChargeToName: string;
    readonly LatestBalance: number;
    readonly DateLastFlight: string;
    constructor(Ref: string, MemberType: string, MembershipNo: string, Name: string, Postcode: string, TelMobile: string,
        TelHome: string, EMail: string, EmergencyContact: string, DateJoined: string, MembershipExpires: string,
        LapsedMember: boolean, MedicalValidTo: string, AFRDue: string, GiftAidMiles: number, ChargeToName: string,
        LatestBalance: number, DateLastFlight: string){
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