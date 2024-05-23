import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaLaboComponent } from './lista-labo/lista-labo.component';

const routes: Routes = [
  { path: '', component: ListaLaboComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LaboRoutingModule { }
