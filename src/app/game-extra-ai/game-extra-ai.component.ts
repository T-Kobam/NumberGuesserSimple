import { Component } from '@angular/core';
import { GuessExtraService } from '../guess-extra/guess-extra.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-game-extra-ai',
  templateUrl: './game-extra-ai.component.html',
  styleUrls: ['./game-extra-ai.component.css']
})
export class GameExtraAiComponent {
  /** メッセージ */
  message: string;
  /** エラーメッセージ */
  errorMessage: string;
  /** 推測回数 */
  guessedCount: number;
  /** プレイヤーのターン判定フラグ */
  isPlayer: boolean;
  /** もう一度ボタン表示フラグ */
  showButtonFlag: boolean;
  /** Guessサービス */
  guessServices: GuessExtraService[];
  /** 推測回数の上限 */
  private static readonly GUESS_LIMIT: number = 5;

  constructor(private router: Router) {
    // サービスの静的メンバ変数の初期化
    GuessExtraService.initialize();

    // サービスの初期化
    this.guessServices = [];
    for (let i = 0; i < GameExtraAiComponent.GUESS_LIMIT; i++) {
      this.guessServices.push(new GuessExtraService());
    }

    this.message = `AIが考えた数字を推測してね！チャンスは${GameExtraAiComponent.GUESS_LIMIT}回だよ！`;
    this.errorMessage = "";
    this.guessedCount = 0;
    this.isPlayer = false;
    this.showButtonFlag = false;
  }

  /**
   * 初期化処理を行う
   */
  private initialize(): void {
    // サービスの静的メンバ変数の初期化
    GuessExtraService.initialize();

    // サービスの初期化
    this.guessServices = [];
    for (let i = 0; i < GameExtraAiComponent.GUESS_LIMIT; i++) {
      this.guessServices.push(new GuessExtraService());
    }

    this.message = `AIが考えた数字を推測してね！チャンスは${GameExtraAiComponent.GUESS_LIMIT}回だよ！`;
    this.errorMessage = "";
    this.guessedCount = 0;
    this.isPlayer = false;
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
   * プレイヤーの入力が行われた時の処理(enterがクリック)
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
      this.message = `${this.guessedCount}回で数字を当てれたよ！おめでとう！すごい！！ (偏差の合計: ${this.getSumOfDeviations()})`;
      this.showButtonFlag = true;
      return;
    }

    if (this.guessedCount >= 5) {
      this.guessedCount++;
      this.message = `プレイヤーの推測回数が超えちゃった... 正解は${this.guessServices[0].getCorrectNumber()}でした〜 (偏差の合計: ${this.getSumOfDeviations()})`;
      this.showButtonFlag = true;
      return;
    }

    this.guessedCount++;
    this.message = "プレイヤー: 1から100の間の整数値を入力してね！";
    event.target.value = "";
  }

  /**
   * ゲームを開始する(始めるボタンがクリック)
   */
  onClickStart(): void {
    // 1-100の間でランダムな整数値を取得
    const randomNumber = Math.floor(Math.random() * 100) + 1;
    // ランダムな整数値をサービスに設定
    this.guessServices.forEach(service => {
      service.setCorrectNumber(randomNumber);
    });
    
    // プレイヤー2に変更
    this.isPlayer = true;
    // プレイヤー2のメッセージに変更
    this.message = "プレイヤー: 1から100の間の整数値を入力してね！";
    this.errorMessage = "";
    // 推測回数を+1する
    this.guessedCount++;
  }

  /**
   * ゲームを初期化する(もう一度ボタンがクリック)
   */
  onClick(): void {
    // 画面初期化
    this.initialize();

    // 画面切り替え
    this.router.navigate(["/game-extra-ai"]);
  }

}
