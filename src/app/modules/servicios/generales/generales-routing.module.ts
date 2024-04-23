import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from '../generales/index/index.component';
import { ListaComponent } from "../generales/lista/lista.component";
import { CotizacionComponent } from "../generales/cotizacion/cotizacion.component";
import { MantenimientoComponent } from '../generales/mantenimiento/mantenimiento.component';

const routes: Routes = [
  {
    path: '',
    component: IndexComponent,
    children: [
      { path: 'mantenimiento', component: MantenimientoComponent },
      { path: 'lista', component: ListaComponent },
      { path: 'agregar', component: CotizacionComponent, }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GeneralesRoutingModule { }
