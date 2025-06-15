import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from '../Services/alert.service';
import { AuthService } from '../Services/auth.service';
import { ScoreDataService } from '../Services/score-data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{

  loginForm: FormGroup;
  successAlertSignUp: string;
  errorLoginStatus: string;
  bgImgUrl = '../assets/bg-black.jpg';

  constructor(private fb:FormBuilder, private router:Router, private alertService: AlertService, private authService:AuthService, private scoreDataService: ScoreDataService){

  }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.email, Validators.required]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });

    // this.alertService.behaviorSubject.subscribe( successMsg => {
    //   this.successAlertSignUp = successMsg;
    // });

    // this.alertService.behaviorSubject.subscribe( errorMsg => {
    //   this.errorLoginStatus = errorMsg;
    // });

    this.successAndErrorAlert();
    
  }

  onLogin(){
    if(this.loginForm.valid){
      if(this.authService.authLogin(this.loginForm.get('email').value, this.loginForm.controls.password.value)){
        const curUser = this.authService?.currentUser;
        console.log('CurrentUser: ', curUser?.userId);
        // this.authService.getScore(curUserId);
        //this.scoreDataService.setItemOnLocalStorage(curUser.userId, curUser);
        this.router.navigate(['/game-page',curUser?.userId]);
        this.alertService.setSuccessAlert('You have been Logged In Successfully!!');
      }
      else{
        this.alertService.setErrorAlert('Check your Credentials / Please sign up and login!!');
      }
    }
    // else{ 
    //   this.alertService.setErrorAlert('Please Check You Credentials');
    // }
  }

  get email(){
    return this.loginForm.controls.email;
  }

  get password(){
    console.log(this.loginForm.controls.password.errors?.length < 8);
    return this.loginForm.get('password');
    
  }

  successAndErrorAlert(){
    this.alertService.successMsg.subscribe( sMsg => {
      this.successAlertSignUp = sMsg;
    });

    this.alertService.errorMsg.subscribe( eMsg => {
      this.errorLoginStatus = eMsg;
    });
  }

  closeAlert(){
    if(this.successAlertSignUp){
      this.successAlertSignUp = '';
     } 
     else if(this.errorLoginStatus){
      this.errorLoginStatus = '';
     }
  }
  
}
