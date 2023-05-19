import { Component } from '@angular/core';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent {
  correctNumber: number;
  guessedNumber: number;
  guessingCount: number;
  message: string;

  constructor() {
    this.correctNumber = 0;
    this.guessedNumber = 0;
    this.guessingCount = 0;
    this.message = "Player one enter a value between 1 and 100 to be guessed";
  }

  onkeydown(event: any): void {
    this.correctNumber = event.target.value;
    this.message = `${this.correctNumber} & enter clicked!!`;
  }
}