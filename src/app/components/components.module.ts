import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IncrementerComponent } from './incrementer/incrementer.component';
import { FormsModule } from '@angular/forms';
import { GraficaDonaComponent } from './grafica-dona/grafica-dona.component';
import { NgChartsModule } from 'ng2-charts';

@NgModule({
  declarations: [IncrementerComponent, GraficaDonaComponent],
  imports: [CommonModule, FormsModule, NgChartsModule],
  exports: [IncrementerComponent, GraficaDonaComponent],
})
export class ComponentsModule {}
