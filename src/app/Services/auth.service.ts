import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { filter, map, retry } from 'rxjs/operators';
import { ScoreDataService } from './score-data.service';
import { USERS_URL } from './urlToken.token';
import { Users } from '../constants/applicationData';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  //usersURL = 'http://localhost:3000/Users';
  usersURL: string;
  isLoggedIn: boolean = false;
  signedUpUsers: any = [{}];
  currentUser: any = [{}];
  // score:any[] = [{}];
  // totalMatches: number;

  constructor(
    @Inject(USERS_URL) private url: string,
    private http: HttpClient
  ) {
    this.usersURL = url;
    this.getUsers();
    const userIdFromSession = sessionStorage.getItem("userId")
    if(userIdFromSession) {
      this.currentUser = this.signedUpUsers.filter((user: any) => user.userId === userIdFromSession)[0]
    }
  }

  authLogin(userMail: string, password: string) {
    //, userId: string
    const cUser = this.signedUpUsers.find((user) => {
      //return user.email === userMail && user.password === password; //&& user.userId === userId;
      // return user.email === userMail && user.password === password && user.userId !== null;
      if (user.email === userMail && user.password === password) {
        return user;
      }
    });
    console.log('Current User: ', cUser);

    this.currentUser = cUser;
    console.log(this.currentUser, "In Service")

    if (cUser) {
      this.isLoggedIn = true;
      sessionStorage.setItem("userId", cUser.userId)
      return true;
    }
    return false;
  }

  isAuthenticated() {
    return sessionStorage.getItem("userId");
  }

  addUsers(payload) {
    return this.http.post(this.usersURL, payload);
  }

  getUsers() {
    // this.http
    //   .get(this.usersURL)
    //   .pipe(
    //     map((usersData: any[]) => {
    //       const filteredData = usersData.map((reqData) => {
    //         return {
    //           username: reqData.username,
    //           email: reqData.email,
    //           password: reqData.password,
    //           userId: reqData.id,
    //           score: reqData.score,
    //           totalMatches: reqData.totalMatches,
    //         };
    //       });
    //       return filteredData;
    //     })
    //   )
    //   .subscribe((fData) => {
        this.signedUpUsers = Users;
        console.log('Signed In Users From Db server: ', this.signedUpUsers);
        console.log('Fdata: ', Users);
      // });
  }

  

  // getScoreWhileLogin(userId:string){
  //   this.http.get(`${this.usersURL}/${userId}`).subscribe((user: any) => {
  //     this.scoreDataService.score = user.score;
  //     this.scoreDataService.totalMatches = user.totalMatches;
  //   })
  // }
}
