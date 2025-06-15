import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AuthService } from '../Services/auth.service';
import { AlertService } from '../Services/alert.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit{
  showButton: boolean = false;
  // isLogout: boolean = false;
  // isCancelled: boolean = false;
  currentUserID : string;
  currentUsername: string;
  successAlertLogin: string;

  constructor(private router:Router, private authService: AuthService, private route:ActivatedRoute, private alertService:AlertService){}

  ngOnInit(): void {
    // this.route.params.subscribe( (params:Params) => {
    //   this.currentUserID = params['id'];
    //   console.log("Header Component user ID:",this.currentUserID);
    // });
    console.log(this.authService.currentUser, "Curr user")
    this.currentUserID = this.authService.currentUser.userId;
    this.currentUsername = this.authService.currentUser.username
    
    this.alertService.successMsg.subscribe( successMsg => {
      this.successAlertLogin = successMsg;
    });
  }

  onLogOut(){
    this.showButton = true;
    // if(this.clickOkay()){
    //   this.showButton = false;
    //   this.router.navigate(['/login']);
    // }else if(this.onCancel()){
    //   this.showButton = false;
    // }
  }

  clickOkay(){
    this.showButton = false;
    this.router.navigate(['/login']);
  }

  onCancel(){
    this.showButton = false;
  }

  closeAlert(){
    if(this.successAlertLogin){
      this.successAlertLogin = '';
     } 
  }

}