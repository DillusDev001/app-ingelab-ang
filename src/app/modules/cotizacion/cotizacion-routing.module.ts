import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaCotizacionComponent } from './cotizacion-laboratorio/lista-cotizacion/lista-cotizacion.component';
import { ListaCotizacionServicioComponent } from './cotizacion-servicios/lista-cotizacion-servicio/lista-cotizacion-servicio.component';

const routes: Routes = [
  { path: 'laboratorio', component: ListaCotizacionComponent, }, // Agregar Componente para ver todas las cotizaciones
  { path: 'servicio', component: ListaCotizacionServicioComponent, }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CotizacionRoutingModule { }
