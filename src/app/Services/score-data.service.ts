import { Inject ,Injectable } from '@angular/core';
import { AuthService } from './auth.service';
// import { HttpClient } from '@angular/common/http';
import { USERS_URL } from './urlToken.token';

@Injectable({
  providedIn: 'root'
})
export class ScoreDataService {

  // score = JSON.parse(localStorage.getItem(this.currentUser.score))  || {
  //   wins: 0,
  //   losses: 0,
  //   ties:0,
  // };
  score = {
    wins: 0,
    losses: 0,
    ties:0,
  };

  // totalMatches: number =  JSON.parse(localStorage.getItem('Total Matches'))  || 0;

  totalMatches: number = 0;

  result: string = 'Your Result!';

  usersUrl: string;

  currentUser: any = [{}];

  constructor(@Inject(USERS_URL) private url:string, private authService:AuthService) { //, private authService:AuthService
    this.usersUrl = url;
    this.currentUser = this.authService.currentUser;
    console.log(this.currentUser);
    // this.score = JSON.parse(localStorage.getItem(this.currentUser.score));
    // this.totalMatches = JSON.parse(localStorage.getItem(this.currentUser.totalMatches));
    this.getScoreWhileLogin(this.currentUser.userId);
  }

 

  // setItemOnLocalStorage(userId: string, curUser:any){
  //   localStorage.setItem(userId, JSON.stringify(curUser));
  //   //localStorage.setItem('Total Matches', JSON.stringify(this.totalMatches));
  // }

  updateScoreOnServer(userID: string){
    // console.log("i'm in method called update score on server");
    // console.log("score: ", this.score);
    // console.log("Total Matches: ", this.totalMatches);
    // const updatedScore = {
    //   score: this.score,
    //   totalMatches: this.totalMatches,
    // }
    // // return this.http.patch(`${this.usersUrl}/${userID}`, updatedScore).subscribe(
    // //   (user: any) => {
    //   //     console.log(`Score Updated Successfully for the ${userID} particular user`);
    //   //   }
    //   // );
    //   // this.authService.currentUser.score = updatedScore
    //   this.score = updatedScore.score;
    //   this.totalMatches = updatedScore.totalMatches + 1;
  }
  
   getScoreWhileLogin(userId:string){
    console.log("I'm in get score while login mehtod");
    console.log("Score: ", this.score);
    console.log("Total Matches: ", this.totalMatches);
    // return this.http.get(`${this.usersUrl}/${userId}`).subscribe((user: any) => {
      this.score = this.authService.currentUser.score;
      this.totalMatches = this.authService.currentUser.totalMatches;
    // });
    
   
  }
  

}