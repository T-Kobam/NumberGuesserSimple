import { AppConstService } from '../constants/app-const.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GuessExtraService {
  private correctNumber: number; // プレイヤー1が入力した値
  private guessNumber: number; // 推測値
  private distanceRange: string; // 推測値と正しい数値の間の距離が該当する範囲
  private imageUrl: string;
  private index: number;
  private static totalIndex: number = 1;

  constructor() {
    this.correctNumber = 0;
    this.guessNumber = -1;    
    this.distanceRange = "-1";
    this.imageUrl = AppConstService.THINKING_09;
    this.index = GuessExtraService.totalIndex;
    GuessExtraService.totalIndex++;
  }

 /**
   * 全要素番号をリセットする 
  */
  static initialize(): void {
    GuessExtraService.totalIndex = 1;
  }

  getCorrectNumber(): number {
    return this.correctNumber;
  }

  setCorrectNumber(x: number): void {
    this.correctNumber = x;
  }

  getGuessNumber(): number {
    return this.guessNumber;
  }

  setGuessNumber(x: number): void {
    this.guessNumber = x;
  }

  getDistanceRange(): string {
    return this.distanceRange;
  }

  setDistanceRange(s: string): void {
    this.distanceRange = s;
  }

  getImageUrl(): string {
    return this.imageUrl;
  }

  setImageUrl(s: string): void {
    this.imageUrl = s;
  }

  getIndex(): number {
    return this.index;
  }

  /**
   * 正値と推測値の差を絶対値で返却する
   * @returns 
   */
  calcAbsDistanceValue(): number {
    return Math.abs(this.correctNumber - this.guessNumber);
  }

  /**
   * 配列の合計値を計算する
   * @param numbers
   * @returns 
   */
  static calcSum(numbers: number[]): number {
    return numbers.reduce((acc: number, val: number) => acc + val);
  }

  /**
   * 配列の平均値を計算する
   * @param numbers
   * @returns 
   */
  static calcAvg(numbers: number[]): number {
    const a: number = this.calcSum(numbers);
    return this.calcSum(numbers) / numbers.length;
  }

  /**
   * 偏差の合計値を計算する
   * @param numbers 
   * @returns 
   */
  static calcSumOfDeviation(numbers: number[]): number {
    const avg: number = this.calcAvg(numbers);
    const deviations: number[] = numbers.map(num => Math.abs(num - avg));
    return this.calcSum(deviations);
  }

  /**
   * 数値のずれを文字列のメッセージを返却する
   * @param x
   * @returns
   */
  distanceToDistanceRangeString(x: number): string {
    if (x === 0) {
      return "0";
    } else if (x >= 1 && x <= 2) {
      return "1 - 2";
    } else if (x >= 3 && x <= 4) {
      return "3 - 4";
    } else if (x >= 5 && x <= 9) {
      return "5 - 9";
    } else if (x >= 10 && x <= 24) {
      return "10 - 24";
    } else if (x >= 25 && x <= 49) {
      return "25 - 49";
    }
    return "50+";
  }

  /**
   * 数値のずれに紐づいた画像を返却する 
   * @param x
   * @returns
   */
  distanceToImageUrl(x: number): string {
    if (x === 0) {
      return AppConstService.HAPPY_02;
    } else if (x >= 1 && x <= 2) {
      return AppConstService.BAD_03;
    } else if (x >= 3 && x <= 4) {
      return AppConstService.SAD_04;
    } else if (x >= 5 && x <= 9) {
      return AppConstService.CONFUSE_05;
    } else if (x >= 10 && x <= 24) {
      return AppConstService.ANGRY_06;
    } else if (x >= 25 && x <= 49) {
      return AppConstService.RAGE_07;
    }
    return AppConstService.OMG_08;
  }
}
