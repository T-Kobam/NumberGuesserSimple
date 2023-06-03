import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GameComponent } from './game/game.component';
import { GuessComponent } from './guess/guess.component';
import { GameExtraComponent } from './game-extra/game-extra.component';

const routes: Routes = [
  { path: '', redirectTo: '/game-simple', pathMatch: 'full' },
  { path: 'game-simple', component: GameComponent },
  { path: 'guess-simple', component: GuessComponent },
  { path: 'game-extra', component: GameExtraComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
