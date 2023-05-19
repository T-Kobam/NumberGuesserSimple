import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent {
  correctNumber: number;
  message: string;
  errorMessage: string;

  constructor(private router: Router) {
    this.correctNumber = 0;
    this.message = "プレイヤー1は1から100までの整数値を1つ入力してください";
    this.errorMessage = "";
  }

  onKeyDown(event: any): void {
    const value: number = event.target.value;
    this.errorMessage = "";
    // 整数値の検証
    if (isNaN(Number(value))) {
      this.errorMessage = "整数値を入力してください";
      return;
    }
    // 1 <= value <= 100の検証
    if (value < 1 || value >100) {
      this.errorMessage = "1から100までの整数値を1つ入力してください";
      return;
    } 

    this.correctNumber = value;
    this.router.navigate(["/guess"]);
  }
}