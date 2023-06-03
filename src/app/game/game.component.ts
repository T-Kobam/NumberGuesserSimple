import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from '../service/common.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent {
  correctNumber: number | undefined;
  message: string;
  errorMessage: string | undefined;

  constructor(private router: Router, private service: CommonService) {
    this.message = "プレイヤー1は1から100までの整数値を1つ入力してください";
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
    this.service.setCurrentNumber(this.correctNumber);
    this.router.navigate(["/guess-simple"]);
  }
}