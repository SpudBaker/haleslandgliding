import { inject, Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendEmailVerification,
  signOut, user, User, UserCredential } from '@angular/fire/auth';
import { from, Observable, ReplaySubject } from 'rxjs';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private firebaseAuth: Auth = inject(Auth);
  public user$ = new ReplaySubject<User | null>(undefined);

  constructor(){
    user(this.firebaseAuth).pipe(
      map(user => this.user$.next(user))
    ).subscribe();
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
