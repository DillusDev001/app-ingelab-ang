import { NgModule, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GraficosRoutingModule } from './graficos-routing.module';
import { GeneralComponent } from './general/general.component';
import { NgApexchartsModule } from 'ng-apexcharts';

@NgModule({
  declarations: [

    GeneralComponent
  ],
  imports: [
    CommonModule,
    GraficosRoutingModule,
    NgApexchartsModule
  ]
})
export class GraficosModule {
  
}
