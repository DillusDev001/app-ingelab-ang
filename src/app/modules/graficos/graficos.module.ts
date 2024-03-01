import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GraficosRoutingModule } from './graficos-routing.module';
import { GeneralComponent } from './general/general.component';


@NgModule({
  declarations: [
  
    GeneralComponent
  ],
  imports: [
    CommonModule,
    GraficosRoutingModule
  ]
})
export class GraficosModule { }
