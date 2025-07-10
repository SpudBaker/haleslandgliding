import { Injectable } from '@angular/core';
import { EMPTY, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as Globals from '../../../globals';
import { Functions, httpsCallableFromURL } from '@angular/fire/functions';
import { inject } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class DataService {

  private signedInMember!: Globals.Member | undefined;
  private firebaseFunctions: Functions = inject(Functions);

  public callFunction(email: string):Promise<any>{
    const url = 'https://getglidexfiles-iw4pdarncq-uc.a.run.app?email='+email;
    const callable = httpsCallableFromURL(this.firebaseFunctions,  url);
    return callable();
  }

  private getMembers(): Observable<Globals.Member[]>{
    return EMPTY;
    /*return of([
        new Globals.Member('1108', '18', '1136', 'Richard Baker', 'BS23 3EF', '', 'spudbaker@gmail.com',
            'Karen Baker -wife 07917321932', new Date('2024/05/04', new Date('2026/06/04'),undefined, false,
             undefined, new Date('2025/12/31'), 0, '1108', -24.76, new Date('2025/06/15')),
        new Globals.Member('639', '1', '1076', 'Rob Grady', 'BA5 1QJ', '', 'rob9grady@gmail.com', 
            'Bridget Grady - 07551 418665.', new Date('2018/06/01'), new Date('2025/11/30'), undefined, false,
            new Date('30/09/2025'), new Date('2025/12/31'), 0, '639', -963.48, new Date('2025/06/14')),
        new Globals.Member('7', '8', '1005', 'Simon Withey', 'BS27 3XR', '01934-743282', 'spwithey@googlemail.com',
            'Mary Emmison (07557-909386)', new Date('1899/12/31'), new Date('2026/06/31'), undefined,
            false, new Date('1900/01/01'), new Date('2029/10/30'), 0, '7', 396.29, new Date('2025/06/22'))
    ]).pipe(
      delay(2000)
    )*/
  }

  public getMemberDetails(email: string): Observable<Globals.Member | undefined>{
    return this.getMembers().pipe(
      map(members => {
        this.signedInMember = members.find(member => member.EMail.toLowerCase() ==email.toLowerCase());
        return this.signedInMember;
      })
    );
  }

  public getSignedInMember(): Globals.Member | undefined {
    return this.signedInMember;
  }

  
}