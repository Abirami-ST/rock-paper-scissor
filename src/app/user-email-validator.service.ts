import { HttpClient } from '@angular/common/http';
import { Injectable, Inject } from '@angular/core';
import { AbstractControl, ValidationErrors } from '@angular/forms';
import { catchError, Observable, of } from 'rxjs';
import { USERS_URL } from './Services/urlToken.token';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserEmailValidatorService {
  usersURL: string;
  constructor( @Inject(USERS_URL) private url:string,private http:HttpClient) {
    this.usersURL = url;
   }

  validateUserEmail(control: AbstractControl): Observable<ValidationErrors | null>{
    const email = control.value.toLowerCase();

    return this.http.get<any[]>(`${this.usersURL}?email=${control.value}`).pipe(
      map(user => user.length > 0 ? {emailTaken: true} : null),
      catchError(() => of(null))
    )
  }
}
