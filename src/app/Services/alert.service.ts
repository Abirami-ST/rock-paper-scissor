import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

 successMsg = new BehaviorSubject<string>('');
 errorMsg = new BehaviorSubject<string>('');

 constructor() { }

 setSuccessAlert(Smsg : string){
  this.successMsg.next(Smsg);
  this.alertClear(this.successMsg);
 }

 setErrorAlert(Emsg){
  this.errorMsg.next(Emsg); //coz the buttons are disabled when the forms are invalid 
  this.alertClear(this.errorMsg);
 }

alertClear(behaviorSubject: BehaviorSubject<string>){
  setTimeout(() => {
    behaviorSubject.next('');
  }, 3000);

}

}
