import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaProveedoresComponent } from './lista-proveedores/lista-proveedores.component';

const routes: Routes = [
  { path: 'lista-proovedores', component: ListaProveedoresComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProovedorRoutingModule { }
