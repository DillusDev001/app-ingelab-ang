import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecepcionFrxListaComponent } from './recepcionFrx/recepcion-frx-lista/recepcion-frx-lista.component';
import { RecepcionFrxComponent } from './recepcionFrx/recepcion-frx/recepcion-frx.component';
import { RecepcionGeneralesComponent } from './recepcionGenerales/recepcion-generales/recepcion-generales.component';
import { RecepcionGeneralesListaComponent } from './recepcionGenerales/recepcion-generales-lista/recepcion-generales-lista.component';

const routes: Routes = [
  { path: 'frx', component: RecepcionFrxComponent },
  { path: 'lista/frx', component: RecepcionFrxListaComponent },
  { path: 'generales', component: RecepcionGeneralesComponent },
  { path: 'lista/generales', component: RecepcionGeneralesListaComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecepcionRoutingModule { }
