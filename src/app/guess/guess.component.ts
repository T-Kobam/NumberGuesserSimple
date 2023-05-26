import { Component } from '@angular/core';
import { CommonService } from '../service/common.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-guess',
  templateUrl: './guess.component.html',
  styleUrls: ['./guess.component.css']
})
export class GuessComponent {
  // 推測値
  guessedNumber: number | string;
  // メッセージ
  message: string;
  // エラーメッセージ
  errorMessage: string | undefined;
  // 差の値
  difference: string;
  // 画像URL
  imgSrc: string | undefined;
  // 推測回数
  count: number;
  // ボタン表示フラグ
  showBtnFlg: string;
  // inputタグ表示フラグ
  showInputFlg: string;
  // 画像ファイルディレクトリ
  IMG_DIRECTORY: string = "../../assets/";
  // ファイル拡張子 : JPG
  JPG: string = ".jpg";
  // 差の値による画像URL
  DIFFERENCE_IMG_SRC: Map<string, string> = new Map([
    ["thinking", this.IMG_DIRECTORY + "thinking" + this.JPG],
    ["happy", this.IMG_DIRECTORY + "happy" + this.JPG],
    ["bad", this.IMG_DIRECTORY + "bad" + this.JPG],
    ["sad", this.IMG_DIRECTORY + "sad" + this.JPG],
    ["confuse", this.IMG_DIRECTORY + "confuse" + this.JPG],
    ["angry", this.IMG_DIRECTORY + "angry" + this.JPG],
    ["rage", this.IMG_DIRECTORY + "rage" + this.JPG],
    ["omg", this.IMG_DIRECTORY + "omg" + this.JPG],
  ]);

  constructor(private router: Router, private service: CommonService) {
    this.message = "プレイヤー2は1から100までの整数値を1つ入力して数字を推測してください";
    this.guessedNumber = "?";
    this.difference = "?";
    this.imgSrc = this.DIFFERENCE_IMG_SRC.get("thinking");
    this.count = 1;
    this.showBtnFlg = "none";
    this.showInputFlg = "block";
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
    if (value < 1 || value > 100) {
      this.errorMessage = "1から100までの整数値を1つ入力してください";
      return;
    }

    this.guessedNumber = value;
    const differenceValue = Math.abs(value - this.service.getCurrentNumber());
    // プレイヤー1の数字との比較
    if (differenceValue === 0) {
      this.message = `数字を当てるのに${this.count}回かかりました。もう一度やりますか？`;
      this.difference = "0";
      this.imgSrc = this.DIFFERENCE_IMG_SRC.get("happy");
      this.showBtnFlg = "block";
      this.showInputFlg = "none";
    } else {
      if (differenceValue >= 1 && differenceValue <= 2) {
        this.imgSrc = this.DIFFERENCE_IMG_SRC.get("bad");
        this.difference = "1 - 2";
      } else if (differenceValue >= 3 && differenceValue <= 4) {
        this.imgSrc = this.DIFFERENCE_IMG_SRC.get("sad");
        this.difference = "3 - 4";
      } else if (differenceValue >= 5 && differenceValue <= 9) {
        this.imgSrc = this.DIFFERENCE_IMG_SRC.get("confuse");
        this.difference = "5 - 9";
      } else if (differenceValue >= 10 && differenceValue <= 24) {
        this.imgSrc = this.DIFFERENCE_IMG_SRC.get("angry");
        this.difference = "10 - 24";
      } else if (differenceValue >= 25 && differenceValue <= 49) {
        this.imgSrc = this.DIFFERENCE_IMG_SRC.get("rage");
        this.difference = "25 - 49";
      } else {
        this.imgSrc = this.DIFFERENCE_IMG_SRC.get("omg");
        this.difference = "50+";
      }
      this.count++;
    }
  }

  onClick(): void {
    this.router.navigate([""]);
  }
}
