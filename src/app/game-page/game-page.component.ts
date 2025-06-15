import { Component, OnInit, ViewChild } from '@angular/core';
import { ScoreBoardComponent } from '../score-board/score-board.component';
import { ScoreDataService } from '../Services/score-data.service';
import { AlertService } from '../Services/alert.service';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../Services/auth.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-game-page',
  templateUrl: './game-page.component.html',
  styleUrl: './game-page.component.css',
})
export class GamePageComponent implements OnInit {
  playerMove:string = 'Pick Yours Moves!!';
  
  computerMove:string = 'Computer Moves!!';

  resultFromService:string = '';

  successAlertLogin: string;

  currentUserId: string;

  computerMoveUrl: string;
  playerMoveUrl: string;

  @ViewChild(ScoreBoardComponent) scoreBoard: ScoreBoardComponent;

  constructor(private scoreDataService: ScoreDataService, private alertService:AlertService, private route:ActivatedRoute, private authService: AuthService, private http: HttpClient){
    this.getResult();
  }

  ngOnInit(): void {
    // this.alertService.successMsg.subscribe( successMsg => {
    //   this.successAlertLogin = successMsg;
    // });

    this.currentUserId = this.route.snapshot.paramMap.get('userId');
    //this.scoreBoard.currentUserId = this.currentUserId;
    if (this.currentUserId) {
      this.scoreDataService.getScoreWhileLogin(this.currentUserId);
    }
  }

  onClickRock(){
    this.playerMove = 'Rock';
    const computerMove =  this.computerMoveCalculation();
    console.log("Computer Move:",computerMove);
    this.assignMoves();
    if(this.playerMove === 'Rock'){
      if(computerMove === 'Rock'){
        this.resultFromService = 'Tie';
      }else if(computerMove === 'Paper'){
        this.resultFromService = 'You Lost';
      }else if (computerMove === 'Scissor'){
        this.resultFromService = 'You Won';
      }
      console.log("Result", this.resultFromService);
      this.sendResult();
      this.scoreBoard.calculateScore();
    } 
   
  }

  onClickPaper(){
    this.playerMove = 'Paper';
    const computerMove = this.computerMoveCalculation();
    console.log("Computer Move:",computerMove);
    this.assignMoves();
    if(this.playerMove === 'Paper'){
      if(computerMove === 'Rock'){
        this.resultFromService = 'You Won';
      }else if(computerMove === 'Paper'){
        this.resultFromService = 'Tie';
      }else if (computerMove === 'Scissor'){
        this.resultFromService = 'You Lost';
      }
      console.log("Result", this.resultFromService);
      this.sendResult();
      this.scoreBoard.calculateScore();
    }
   
  }

  onClickScissor(){
    this.playerMove = 'Scissor';
    const computerMove  = this.computerMoveCalculation();
    console.log("Computer Move:",computerMove);
    this.assignMoves();
    if(this.playerMove === 'Scissor'){
      if(computerMove === 'Rock'){
        this.resultFromService = 'You Lost';
      }else if(computerMove === 'Paper'){
        this.resultFromService = 'You Won';
      }else if (computerMove === 'Scissor'){
        this.resultFromService = 'Tie';
      }
      console.log("Result", this.resultFromService);
      this.sendResult();
      this.scoreBoard.calculateScore();
    }
    
  }
  
  computerMoveCalculation(){
    const randomNumber: number = Math.random();
    if(randomNumber >= 0 && randomNumber < 1/3){
      this.computerMove = 'Rock';
    }else if(randomNumber >= 1/3 && randomNumber < 2/3){
      this.computerMove = 'Paper';
    }else if(randomNumber >= 2/3 && randomNumber < 1){
      this.computerMove = 'Scissor';
    }
    return this.computerMove;
  }

  getResult(){
    this.resultFromService = this.scoreDataService.result;
    console.log("Get Result: ", this.resultFromService);
  }

  sendResult(){
    this.scoreDataService.result = this.resultFromService;
    console.log("Send Result to service: ",this.scoreDataService.result);
  }

  
  // closeAlert(){
  //   if(this.successAlertLogin){
  //     this.successAlertLogin = '';
  //    } 
  // }

  assignMoves(){
    this.playerMoveUrl=`./assets/${this.playerMove}-emoji.png`;
    this.computerMoveUrl = `./assets/${this.computerMove}-emoji.png`;
  }
}
