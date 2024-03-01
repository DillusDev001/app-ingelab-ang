import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CotizacionRoutingModule } from './cotizacion-routing.module';
import { SharedModule } from '../shared/shared.module';
import { ListaCotizacionComponent } from './cotizacion-laboratorio/lista-cotizacion/lista-cotizacion.component';
import { AgregarCotizacionComponent } from './cotizacion-laboratorio/agregar-cotizacion/agregar-cotizacion.component';
import { ListaCotizacionServicioComponent } from './cotizacion-servicios/lista-cotizacion-servicio/lista-cotizacion-servicio.component';
import { AgregarCotizacionServicioComponent } from './cotizacion-servicios/agregar-cotizacion-servicio/agregar-cotizacion-servicio.component';


@NgModule({
  declarations: [
    ListaCotizacionComponent,
    AgregarCotizacionComponent,
    ListaCotizacionServicioComponent,
    AgregarCotizacionServicioComponent,
  ],
  imports: [
    CommonModule,
    CotizacionRoutingModule,
    SharedModule,
  ]
})
export class CotizacionModule { }
