import { inject, Injectable } from '@angular/core';
import { ActionCodeSettings, Auth, signInWithEmailAndPassword, sendPasswordResetEmail,
   signOut, user, User, UserCredential } from '@angular/fire/auth';
import { NavigationEnd, Router } from '@angular/router';
import { from, Observable, ReplaySubject } from 'rxjs';
import { filter, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public authInitiated = false;
  private firebaseAuth: Auth = inject(Auth);
  private router: Router = inject(Router);
  public selectedRoute = new ReplaySubject<string>(1);
  public user$ = new ReplaySubject<User | null>(1);

  constructor(){
    user(this.firebaseAuth).pipe(
      map(user => this.user$.next(user))
    ).subscribe();
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map(event =>{
        this.selectedRoute.next(event.urlAfterRedirects.slice('/shell/'.length))
      })
    ).subscribe();
  }

  public sendPasswordResetEmail(email: string): Observable<void>{
    const acs: ActionCodeSettings= {
      url: 'https://glidexmemberview.firebaseapp.com/',
      handleCodeInApp: false
    };
    return from(sendPasswordResetEmail(
      this.firebaseAuth,
      email,
      acs
    ));
  }

  public signIn(email: string, password: string): Observable<UserCredential> {
    return from(signInWithEmailAndPassword(
      this.firebaseAuth,
      email,
      password
    ));
  }

  public signOut(): Observable<void> {
    return from(signOut(this.firebaseAuth));
  }

  /*public async signup(email: string, password: string): Promise<void> {
    const userCredential: UserCredential = await createUserWithEmailAndPassword(
      this.firebaseAuth,
      email,
      password
    )
    await sendEmailVerification(userCredential.user, null)
  }*/
  
}
