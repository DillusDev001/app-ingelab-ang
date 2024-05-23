import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from '../especificos/index/index.component';
import { FrxComponent } from '../especificos/cotizacion/frx/frx.component';
import { ListaFrxComponent } from './lista/lista-frx/lista-frx.component';
import { ParametroComponent } from './mantenimiento/parametro/parametro.component';

const routes: Routes = [
  {
    path: '', component: IndexComponent,
    children: [
      { path: 'lista-frx', component: ListaFrxComponent },
      { path: 'agregar/frx', component: FrxComponent, },
      { path: 'recepcion', loadChildren: () => import('./../../recepcion/recepcion.module').then(m => m.RecepcionModule) }
    ]
  },
  { path: 'mantenimiento/parametro', component: ParametroComponent, }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EspecificosRoutingModule { }
