import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-incrementer',
  templateUrl: './incrementer.component.html',
  styles: [],
})
export class IncrementerComponent {
  @Input('valueInitialProgress') progress: number = 40;
  @Input() btnClass: string = 'btn btn-primary'; // initial value
  @Output() progressValue = new EventEmitter<number>();

  changeValue(value: number) {
    if (this.progress >= 100 && value >= 0) {
      this.progressValue.emit(100);
      return (this.progress = 100);
    }

    if (this.progress <= 0 && value <= 0) {
      this.progressValue.emit(0);
      return (this.progress = 0);
    }

    this.progressValue.emit(this.progress + value);
    return (this.progress += value);
  }

  // changeValueInput(ev: Event) {
  changeValueInput(valueInput: number) {
    // const progressValue = parseInt((ev.target as HTMLInputElement).value);
    const progressValue = valueInput; 
    if (progressValue >= 100) this.progress = 100;
    if (progressValue <= 0) this.progress = 0;
    this.progressValue.emit(this.progress);
  }
}
