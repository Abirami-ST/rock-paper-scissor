import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GamePageComponent } from './game-page/game-page.component';
import { HeaderComponent } from './header/header.component';
import { ScoreBoardComponent } from './score-board/score-board.component';
import { MatGridListModule} from '@angular/material/grid-list';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { provideHttpClient } from '@angular/common/http';
import { USERS_URL } from './Services/urlToken.token';


import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import { AuthService } from './Services/auth.service';

@NgModule({
  declarations: [
    AppComponent,
    GamePageComponent,
    HeaderComponent,
    ScoreBoardComponent,
    LoginComponent,
    SignUpComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatGridListModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule, 
    MatInputModule, 
    MatIconModule
  ],
  providers: [provideHttpClient(),
    {provide: USERS_URL, useValue:'http://localhost:3000/Users'},
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
