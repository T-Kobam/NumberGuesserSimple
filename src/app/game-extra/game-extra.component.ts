import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from '../service/common.service';
import { GuessExtraService } from '../guess-extra/guess-extra.service';

@Component({
  selector: 'app-game-extra',
  templateUrl: './game-extra.component.html',
  styleUrls: ['./game-extra.component.css']
})
export class GameExtraComponent {
  /** メッセージ */
  message: string;
  /** エラーメッセージ */
  errorMessage: string;
  /** 推測回数 */
  guessedCount: number;
  /** プレイヤー1判定フラグ */
  isPlayerOne: boolean;
  /** もう一度ボタン表示フラグ */
  showButtonFlag: boolean;
  /** Guessサービス */
  guessServices: GuessExtraService[];
  /** 推測回数の上限 */
  private static readonly GUESS_LIMIT: number = 5;

  constructor(private router: Router) {
    // サービスの初期化
    this.guessServices = [];
    for (let i = 0; i < GameExtraComponent.GUESS_LIMIT; i++) {
      this.guessServices.push(new GuessExtraService());
    }

    this.message = "プレイヤー1: 1から100までの整数値を1つ入力してね！";
    this.errorMessage = "";
    this.guessedCount = 0;
    this.isPlayerOne = true;
    this.showButtonFlag = false;
  }

  private initialize(): void {
    // サービスの静的メンバ変数の初期化
    GuessExtraService.initialize();

    // サービスの初期化
    this.guessServices = [];
    for (let i = 0; i < GameExtraComponent.GUESS_LIMIT; i++) {
      this.guessServices.push(new GuessExtraService());
    }

    this.message = "プレイヤー1: 1から100までの整数値を1つ入力してね！";
    this.errorMessage = "";
    this.guessedCount = 0;
    this.isPlayerOne = true;
    this.showButtonFlag = false;
  }

  /**
   * 偏差の合計を計算する
   * @returns
   */
  private getSumOfDeviations(): number {
    if (this.guessedCount === 1) {
      return 0;
    }

    // 偏差の合計を計算
    const guessedNumbers: number[] = [];
    for (let i = 0; i < this.guessedCount - 1; i++) {
      guessedNumbers.push(Number(this.guessServices[i].getGuessNumber()));
    }
    return GuessExtraService.calcSumOfDeviation(guessedNumbers);
  }

  /**
   * プレイヤー1の入力が行われた時の処理(enterがクリック)
   * @param event 
   * @returns 
   */
  onKeyDownCorrectNumber(event: any): void {
    const value: number = event.target.value;
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

    // 正値をサービスに設定
    this.guessServices.forEach(service => {
      service.setCorrectNumber(value);
    });

    // プレイヤー2に変更
    this.isPlayerOne = false;
    // プレイヤー2のメッセージに変更
    this.message = "プレイヤー2: 1から100の間の整数値を入力してね！";
    this.errorMessage = "";
    // 推測回数を+1する
    this.guessedCount += 1;
  }

  /**
   * プレイヤー2の入力が行われた時の処理(enterがクリック)
   * @param event 
   * @returns 
   */
  onKeyDownGuessedNumber(event: any): void {
    let value: number = event.target.value;
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

    // 推測値をサービスに設定
    const service = this.guessServices[this.guessedCount - 1];
    service.setGuessNumber(value);

    // 正値とのずれを計算
    const differenceValue: number = service.calcAbsDistanceValue();
    service.setDistanceRange(service.distanceToDistanceRangeString(differenceValue));
    service.setImageUrl(service.distanceToImageUrl(differenceValue));

    if (differenceValue === 0) {
      this.message = `${this.guessedCount}回で数字を当てれたよ！ 偏差の合計: ${this.getSumOfDeviations()}`;
      this.showButtonFlag = true;
      return;
    }

    if (this.guessedCount >= 5) {
      this.guessedCount++;
      this.message = `プレイヤー2の推測回数が超えちゃった... 偏差の合計: ${this.getSumOfDeviations()}`;
      this.showButtonFlag = true;
      return;
    }

    this.guessedCount++;
    this.message = "プレイヤー2: 1から100の間の整数値を入力してね！";
    event.target.value = "";
  }

  /**
   * ゲームを初期化する(もう一度ボタンがクリック)
   */
  onClick(): void {
    // 画面初期化
    this.initialize();

    // 画面切り替え
    this.router.navigate(["/game-extra"]);
  }
}
