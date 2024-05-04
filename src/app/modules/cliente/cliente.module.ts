import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClienteRoutingModule } from './cliente-routing.module';
import { AgregarPersonaComponent } from './persona/agregar-persona/agregar-persona.component';
import { ListaPersonaComponent } from './persona/lista-persona/lista-persona.component';
import { AgregarEmpresaComponent } from './empresa/agregar-empresa/agregar-empresa.component';
import { ListaEmpresaComponent } from './empresa/lista-empresa/lista-empresa.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    AgregarPersonaComponent,
    ListaPersonaComponent,
    AgregarEmpresaComponent,
    ListaEmpresaComponent
  ],
  imports: [
    CommonModule,
    ClienteRoutingModule,
    SharedModule
  ]
})
export class ClienteModule { }
