import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.css'],
})
export class ProgressComponent {
  progressOne: number = 10;
  progressTwo: number = 25;

  get getPercentageOne() {
    return `${this.progressOne}%`;
  }

  get getPercentageTwo() {
    return `${this.progressTwo}%`;
  }

  changeProgressValueOne(value: number) {
    this.progressOne = value; 
  }

  changeProgressValueTwo(value: number) {
    this.progressTwo = value; 
  }
}
