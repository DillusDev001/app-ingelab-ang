import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LaboRoutingModule } from './labo-routing.module';
import { ListaLaboComponent } from './lista-labo/lista-labo.component';
import { SharedModule } from '../shared/shared.module';
import { RecepcionModule } from '../recepcion/recepcion.module';


@NgModule({
  declarations: [
  
    ListaLaboComponent
  ],
  imports: [
    CommonModule,
    LaboRoutingModule,
    SharedModule,
    RecepcionModule
  ]
})
export class LaboModule { }
