import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { ChartData, ChartEvent, ChartType, Color } from 'chart.js'; // grafica

@Component({
  selector: 'app-grafica-dona',
  templateUrl: './grafica-dona.component.html',
  styles: [],
})
export class GraficaDonaComponent implements OnInit {

  ngOnInit(): void {
    this.doughnutChartLabels = this.labels;
    this.doughnutChartData = {
      labels: this.doughnutChartLabels,
      datasets: [
        { data: this.data, backgroundColor: ['#9E120E', '#FF5800', '#FFB414'] },
      ],
    };
   
  }
  @Input() title: string = 'sin titulo';
  @Input() data: number[] = [350, 450, 100];
  @Input() labels: string[] = [
    'Download Sales',
    'In-Store Sales',
    'Mail-Order Sales',
  ];

  // @Input() title!: string 
  // @Input() data!: number[] 
  // @Input() labels!: string[] 
  // Doughnut
  public doughnutChartLabels: string[] = this.labels;
  public doughnutChartData: ChartData<'doughnut'> = {
    labels: this.doughnutChartLabels,
    datasets: [
      {
        data: this.data,
        backgroundColor: ['#9E120E', '#FF5800', '#FFB414'],
      },
    ],
  };
  public doughnutChartType: ChartType = 'doughnut';

  // events
  public chartClicked({
    event,
    active,
  }: {
    event: ChartEvent;
    active: {}[];
  }): void {
    console.log(event, active);
  }

  public chartHovered({
    event,
    active,
  }: {
    event: ChartEvent;
    active: {}[];
  }): void {
    console.log(event, active);
  }
}
