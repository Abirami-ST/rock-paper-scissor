import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { GamePageComponent } from './game-page/game-page.component';
import { HeaderComponent } from './header/header.component';
import { ScoreBoardComponent } from './score-board/score-board.component';
import { canActivateGuard } from './can-activate.guard';

const routes: Routes = [
  {path:'', redirectTo:'/login', pathMatch:'full'},
  {path:'login', component:LoginComponent},
  {path:'sign-up', component:SignUpComponent},
  //{path:'game-page', component:GamePageComponent},
  // {path:'game-page/:userId', component:GamePageComponent}, //created for applying css
  {path:'game-page/:userId', component:GamePageComponent, canActivate: [canActivateGuard]},
  {path:'**', redirectTo:'/login'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { 

}
