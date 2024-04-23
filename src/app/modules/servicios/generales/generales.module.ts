import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GeneralesRoutingModule } from './generales-routing.module';
import { IndexComponent } from './index/index.component';
import { ListaComponent } from './lista/lista.component';
import { CotizacionComponent } from './cotizacion/cotizacion.component';
import { SharedModule } from '../../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MantenimientoComponent } from './mantenimiento/mantenimiento.component';


@NgModule({
  declarations: [
    IndexComponent,
    ListaComponent,
    CotizacionComponent,
    MantenimientoComponent
  ],
  imports: [
    CommonModule,
    GeneralesRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class GeneralesModule { }
