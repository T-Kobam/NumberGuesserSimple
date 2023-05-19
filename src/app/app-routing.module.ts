import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GameComponent } from './game/game.component';
import { GuessComponent } from './guess/guess.component';

const routes: Routes = [
  { path: '', redirectTo: '/game', pathMatch: 'full' },
  { path: 'game', component: GameComponent },
  { path: 'guess', component: GuessComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
