import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../Services/auth.service';
import { AlertService } from '../Services/alert.service';
import { ScoreDataService } from '../Services/score-data.service';
import { UserEmailValidatorService } from '../user-email-validator.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent implements OnInit{

  signUpForm : FormGroup;
  usersSignedIn: {};

  constructor(private fb:FormBuilder, private router:Router, private authService:AuthService, private alertService: AlertService, private scoreDataService: ScoreDataService, private emailValidator: UserEmailValidatorService ){}

  ngOnInit(): void {
    this.signUpForm = this.fb.group({
      username: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email], this.emailValidator.validateUserEmail.bind(this.emailValidator)],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: [null, [Validators.required]],
    },
    {
      validator: this.customPasswordMatchValidator
    }
  ); 
  }

  customPasswordMatchValidator(frm: FormGroup){  //We can use ctrl:AbstractControl as well
    if(frm.controls.password.value === frm.controls.confirmPassword.value)
      //return control.get('password').value === control.get('confirmPassword').value ? null : {'mismatch': true};
    return null
    else
      return {'mismatch': true};
  }

  get username(){
    return this.signUpForm.controls.username; //We can use any methods to access the form controls like controls or get()
  }

  get email(){
    return this.signUpForm.controls.email;
  }

  get password(){
    return this.signUpForm.get('password');
  }

  get confirmPwd(){
    return this.signUpForm.get('confirmPassword'); 
  }

  onSignUp(){
    if(this.signUpForm.valid){
      const payload = {...this.signUpForm.value, 
        // score: this.scoreDataService.score,
        // totalMatches: this.scoreDataService.totalMatches
        score: {
          wins: 0,
          losses: 0,
          ties:0,
        },
        totalMatches: 0
      
      };        
      this.authService.addUsers(payload).subscribe(data => {
        this.usersSignedIn = data;
        console.log('Signed In users : ', this.usersSignedIn);
      });
      this.router.navigate(['/login']);
      this.alertService.setSuccessAlert('You have been Signed In SuccessFully');
    }
  }
}
