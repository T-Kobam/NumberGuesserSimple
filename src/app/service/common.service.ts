import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  correctNumber: number;

  constructor() { 
    this.correctNumber = 0;
  }

  setCurrentNumber(number: number) {
    this.correctNumber = number;
  }

  getCurrentNumber() {
    return this.correctNumber;
  }
}
