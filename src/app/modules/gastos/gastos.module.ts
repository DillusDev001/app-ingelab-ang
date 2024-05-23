import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GastosRoutingModule } from './gastos-routing.module';
import { AgregarGastosComponent } from './agregar-gastos/agregar-gastos.component';
import { ListaGastosComponent } from './lista-gastos/lista-gastos.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    AgregarGastosComponent,
    ListaGastosComponent
  ],
  imports: [
    CommonModule,
    GastosRoutingModule,
    SharedModule
  ]
})
export class GastosModule { }
