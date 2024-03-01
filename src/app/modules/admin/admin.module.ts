import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { HomeComponent } from './component/home/home.component';
import { SharedModule } from '../shared/shared.module';
import { UsuarioComponent } from './component/usuario/usuario.component';
import { AuthModule } from '../auth/auth.module';
import { CardComponent } from './component/card/card.component';


@NgModule({
  declarations: [
    DashboardComponent,
    HomeComponent,
    UsuarioComponent,
    CardComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    AuthModule,
    SharedModule,
  ]
})
export class AdminModule { }
