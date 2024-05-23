import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaGastosComponent } from './lista-gastos/lista-gastos.component';

const routes: Routes = [
  { path: '', component: ListaGastosComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GastosRoutingModule { }
