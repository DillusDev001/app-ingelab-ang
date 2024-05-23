import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProovedorRoutingModule } from './proovedor-routing.module';
import { ListaProveedoresComponent } from './lista-proveedores/lista-proveedores.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    ListaProveedoresComponent
  ],
  imports: [
    CommonModule,
    ProovedorRoutingModule,
    SharedModule
  ]
})
export class ProovedorModule { }
