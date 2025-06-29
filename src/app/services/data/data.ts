import { Injectable } from '@angular/core';
import { delay, Observable, of } from 'rxjs';
import * as Globals from '../../../globals';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  public getMembers(): Observable<Globals.Member[]>{
    return of([
        new Globals.Member('1108', '18', '1136', 'Richard Baker', 'BS23 3EF', '', 'spudbaker@gmail.com',
            'Karen Baker -wife 07917321932', new Date('04/05/2024'), new Date('04/06/2026'),undefined, false,
             undefined, new Date('31/12/2025'), 0, '1108', -24.76, new Date('15/06/2025')),
        new Globals.Member('639', '1', '1076', 'Rob Grady', 'BA5 1QJ', '', 'rob9grady@gmail.com', 
            'Bridget Grady - 07551 418665.', new Date('01/06/2018'), new Date('30/11/2025'), undefined, false,
            new Date('30/09/2025'), new Date('31/12/2025'), 0, '639', -963.48, new Date('14/06/2025')),
        new Globals.Member('7', '8', '1005', 'Simon Withey', 'BS27 3XR', '01934-743282', 'spwithey@googlemail.com',
            'Mary Emmison (07557-909386)', new Date('31/12/1899'), new Date('31/05/2026'), undefined,
            false, new Date('01/01/1900'), new Date('30/10/2029'), 0, '7', 396.29, new Date('22/06/2025'))
    ]).pipe(
      delay(3000)
    )
  }

  
}