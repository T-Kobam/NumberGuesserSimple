import { Component } from '@angular/core';
import { CommonService } from '../service/common.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-guess',
  templateUrl: './guess.component.html',
  styleUrls: ['./guess.component.css']
})
export class GuessComponent {
  guessedNumber: number | string;
  message: string;
  errorMessage: string | undefined;
  difference: number | string;
  imgSrc: string;
  count: number;
  isShowBtn: string;
  isShowInput: string;

  constructor(private router: Router, private service: CommonService) {
    this.message = "プレイヤー2は1から100までの整数値を1つ入力して数字を推測してください";
    this.guessedNumber = "?";
    this.difference = "?";
    this.imgSrc = "../../assets/thinking_human.jpg";
    this.count = 1;
    this.isShowBtn = "none";
    this.isShowInput = "block";
  }

  /**
   * Enterキー押下時に、正解値と推測値の正誤判定を行う
   * @param event 
   * @returns 
   */
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

    this.guessedNumber = value;
    // プレイヤー1の数字との比較
    if (value === this.service.getCurrentNumber()) {
      this.message = `数字を当てるのに${this.count}回かかりました。もう一度やりますか？`;
      this.difference = value - this.service.getCurrentNumber();
      this.imgSrc = "../../assets/happy_human.jpg";
      this.isShowBtn = "block";
      this.isShowInput = "none";
    } else {

    }
  }

  onClick(): void {
    this.router.navigate([""]);
  }
}
