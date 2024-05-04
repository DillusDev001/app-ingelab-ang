import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaEmpresaComponent } from './empresa/lista-empresa/lista-empresa.component';
import { ListaPersonaComponent } from './persona/lista-persona/lista-persona.component';
import { AgregarEmpresaComponent } from './empresa/agregar-empresa/agregar-empresa.component';
import { AgregarPersonaComponent } from './persona/agregar-persona/agregar-persona.component';

const routes: Routes = [
  { path: 'lista-empresa', component: ListaEmpresaComponent },
  { path: 'lista-persona', component: ListaPersonaComponent },
  { path: 'agregar', component: AgregarEmpresaComponent },
  { path: 'agregar-persona', component: AgregarPersonaComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClienteRoutingModule { }
