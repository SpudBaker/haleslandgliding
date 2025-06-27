import { inject, Injectable } from '@angular/core';
import { Auth, signInWithEmailAndPassword, user, UserCredential, sendEmailVerification, createUserWithEmailAndPassword } from '@angular/fire/auth';
import { from, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private firebaseAuth: Auth = inject(Auth);
  public user$ = user(this.firebaseAuth);

  public signin(email: string, password: string): Observable<UserCredential> {
    return from(signInWithEmailAndPassword(
      this.firebaseAuth,
      email,
      password
    ));
  }

  public async signup(email: string, password: string): Promise<void> {
    const userCredential: UserCredential = await createUserWithEmailAndPassword(
      this.firebaseAuth,
      email,
      password
    )
    await sendEmailVerification(userCredential.user, null)
  }
  
}
