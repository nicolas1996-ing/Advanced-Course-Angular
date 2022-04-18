import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-grafica1',
  templateUrl: './grafica1.component.html',
  styles: [],
})
export class Grafica1Component{

  titleOne: string = 'Sales';
  titleTwo: string = 'Comercial';
  titleThree: string = 'Customers';
  titleFourth: string = 'Leads';

  labelsOne: string[] = [
    'Download Sales',
    'In-Store Sales',
    'Mail-Order Sales',
  ];

  labelsTwo: string[] = ['Cars Sales', 'Motorcicles Sales', 'Bikes Sales'];

  labelsThree: string[] = ['PCs Sales', 'Keyboard Sales', 'Mouses Sales'];

  labelsFourth: string[] = ['Jeans Sales', 'Sockets Sales', 'Shirts Sales'];

  randomNumber = () => {
    return Math.round(Math.random() * 1000);
  };

  dataOne: number[] = [
    this.randomNumber(),
    this.randomNumber(),
    this.randomNumber(),
  ];
  dataTwo: number[] = [
    this.randomNumber(),
    this.randomNumber(),
    this.randomNumber(),
  ];
  dataThree: number[] = [
    this.randomNumber(),
    this.randomNumber(),
    this.randomNumber(),
  ];
  dataFourth: number[] = [
    this.randomNumber(),
    this.randomNumber(),
    this.randomNumber(),
  ];
}
