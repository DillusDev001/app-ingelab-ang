import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EspecificosRoutingModule } from './especificos-routing.module';
import { IndexComponent } from './index/index.component';
import { FrxComponent } from './cotizacion/frx/frx.component';
import { SharedModule } from '../../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListaFrxComponent } from './lista/lista-frx/lista-frx.component';
import { ParametroComponent } from './mantenimiento/parametro/parametro.component';
import { ParametroNombrePipe } from './pipes/parametroNombre/parametro-nombre.pipe';


@NgModule({
  declarations: [
    IndexComponent,
    FrxComponent,
    ListaFrxComponent,
    ParametroComponent,
    ParametroNombrePipe
  ],
  imports: [
    CommonModule,
    EspecificosRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  // providers: [Para]
})
export class EspecificosModule { }
