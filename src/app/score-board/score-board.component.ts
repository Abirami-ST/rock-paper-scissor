import { Component,Input } from '@angular/core';
import { ScoreDataService } from '../Services/score-data.service';
import { AuthService } from '../Services/auth.service';

@Component({
  selector: 'app-score-board',
  templateUrl: './score-board.component.html',
  styleUrl: './score-board.component.css'
})
export class ScoreBoardComponent {

  scoreFromService: any = [{}];

  resultFromService: string = '';

  totalMatchesFromService: number = 0;

  @Input() currentUserId: string;

  constructor(private scoreDataService: ScoreDataService, private authService:AuthService ){ 
    //this.currentUserId = this.scoreDataService.currentUser.userId;
    //this.authService.getScoreWhileLogin(this.currentUserId);
    this.getDataFromService(); 
    this.totalMatchesFromService = this.scoreDataService.totalMatches;
  }

  getDataFromService(){
    //this.scoreFromService = {...this.scoreDataService.score};
    //this.authService.getScoreWhileLogin(this.currentUserId);
    this.scoreFromService = this.authService.currentUser.score;
    console.log("Score from get data from service: ", this.scoreFromService);
    this.resultFromService = this.scoreDataService.result;
    
    console.log("Total Macthes from get data from service: ", this.totalMatchesFromService);
  }

  
  calculateScore(){
    this.getDataFromService();
    this.totalMatchesFromService += 1;
    console.log("Displaying from calculate score:",this.resultFromService);
    if(this.resultFromService === 'You Won'){
      this.scoreFromService.wins += 1;
    }else if(this.resultFromService === 'You Lost'){
      this.scoreFromService.losses += 1;
    }else if(this.resultFromService === 'Tie'){
      this.scoreFromService.ties += 1;
    }
    console.log(`Wons: ${this.scoreFromService.wins} || Losses: ${this.scoreFromService.losses} || Ties: ${this.scoreFromService.ties}`);
    this.sendScore();
    //this.scoreDataService.setItemOnLocalStorage(this.currentUser.userId, this.currentUser);
    //this.scoreDataService.updateScoreOnServer(this.currentUserId);
   
  }

  resetScore(){
    this.totalMatchesFromService = 0;
    this.scoreFromService.wins = 0;
    this.scoreFromService.losses = 0;
    this.scoreFromService.ties = 0;
    console.log('ScoreFromscoreFromService has been reset');
    console.log(`Wons: ${this.scoreFromService.wins} || Losses: ${this.scoreFromService.losses} || Ties: ${this.scoreFromService.ties}`);
    this.sendScore();
    //localStorage.removeItem(this.currentUser.userId);
    //localStorage.removeItem('Total Matches');
    //this.scoreDataService.updateScoreOnServer(this.currentUserId);
  }

  sendScore(){
    this.scoreDataService.score = this.scoreFromService;
    console.log("Sending score to the service: ", this.scoreDataService);
    // this.scoreDataService.totalMatches = this.totalMatchesFromService;
    console.log("Total Matches sending to the service: ", this.totalMatchesFromService);

    this.scoreDataService.updateScoreOnServer(this.currentUserId);
    this.scoreDataService.getScoreWhileLogin(this.currentUserId);
    //this.getDataFromService();

    //this.scoreDataService.updateScoreOnServer(this.currentUserId);
    // this.scoreDataService.updateScoreOnServer(this.currentUserId).add(() => {
    //   this.getDataFromService;
    // });
  }

  // getScore(userId:string){
  //   this.http.get(`${this.usersURL}/${userId}`).subscribe((user: any) => {
  //     this.currentUser = user;
  //     this.score = {...user.score};
  //     this.totalMatches = user.totalMatches;

  //   })
  // }

}

