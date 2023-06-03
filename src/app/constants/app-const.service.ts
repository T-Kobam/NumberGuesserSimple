import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppConstService {
  /** 画像ファイルディレクトリ */
  private static readonly IMG_DIRECTORY: string = "../../assets/";
  /** ファイル拡張子: JPG */
  private static readonly JPG: string = ".jpg";
  
  /** 01_thinking.jpg */
  public static readonly THINKING_01: string = AppConstService.IMG_DIRECTORY + "01_thinking" + AppConstService.JPG;
  /** 02_happy.jpg */
  public static readonly HAPPY_02: string = AppConstService.IMG_DIRECTORY + "02_happy" + AppConstService.JPG;
  /** 03_bad.jpg */
  public static readonly BAD_03: string = AppConstService.IMG_DIRECTORY + "03_bad" + AppConstService.JPG;
  /** 04_sad.jpg */
  public static readonly SAD_04: string = AppConstService.IMG_DIRECTORY + "04_sad" + AppConstService.JPG;
  /** 05_confuse.jpg */
  public static readonly CONFUSE_05: string = AppConstService.IMG_DIRECTORY + "05_confuse" + AppConstService.JPG;
  /** 06_angry.jpg */
  public static readonly ANGRY_06: string = AppConstService.IMG_DIRECTORY + "06_angry" + AppConstService.JPG;
  /** 07_rage.jpg */
  public static readonly RAGE_07: string = AppConstService.IMG_DIRECTORY + "07_rage" + AppConstService.JPG;
  /** 08_omg.jpg */
  public static readonly OMG_08: string = AppConstService.IMG_DIRECTORY + "08_omg" + AppConstService.JPG;
  /** 09_thinking2.jpg */
  public static readonly THINKING_09: string = AppConstService.IMG_DIRECTORY + "09_thinking2" + AppConstService.JPG;
}
