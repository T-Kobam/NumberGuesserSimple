import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GameComponent } from './game/game.component';
import { FormsModule } from '@angular/forms';
import { GuessComponent } from './guess/guess.component';
import { CommonService } from './service/common.service';
import { GameExtraComponent } from './game-extra/game-extra.component';
import { GuessExtraService } from './guess-extra/guess-extra.service';
import { GameExtraAiComponent } from './game-extra-ai/game-extra-ai.component';

@NgModule({
  declarations: [
    AppComponent,
    GameComponent,
    GuessComponent,
    GameExtraComponent,
    GameExtraAiComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [
    CommonService,
    GuessExtraService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
