import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RecepcionRoutingModule } from './recepcion-routing.module';
import { RecepcionFrxComponent } from './recepcionFrx/recepcion-frx/recepcion-frx.component';
import { RecepcionFrxListaComponent } from './recepcionFrx/recepcion-frx-lista/recepcion-frx-lista.component';
import { RecepcionGeneralesComponent } from './recepcionGenerales/recepcion-generales/recepcion-generales.component';
import { RecepcionGeneralesListaComponent } from './recepcionGenerales/recepcion-generales-lista/recepcion-generales-lista.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    RecepcionFrxComponent,
    RecepcionFrxListaComponent,

    RecepcionGeneralesComponent,
    RecepcionGeneralesListaComponent
  ],
  exports: [
    RecepcionFrxComponent,
  ],
  imports: [
    CommonModule,
    RecepcionRoutingModule,
    SharedModule
  ]
})
export class RecepcionModule { }
