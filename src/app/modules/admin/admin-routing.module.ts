import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { HomeComponent } from './component/home/home.component';
import { UsuarioComponent } from './component/usuario/usuario.component';

const routes: Routes = [
  {
    path: '', component: DashboardComponent,
    children: [
      { path: 'home', component: HomeComponent, },
      { path: 'usuarios', component: UsuarioComponent },
      { path: 'servicios/especificos', loadChildren: () => import('./../../modules/servicios/especificos/especificos.module').then(m => m.EspecificosModule) },
      { path: 'servicios/generales', loadChildren: () => import('./../../modules/servicios/generales/generales.module').then(m => m.GeneralesModule) },
      { path: 'graficos', loadChildren: () => import('./../graficos/graficos.module').then(m => m.GraficosModule) },
      { path: 'cliente', loadChildren: () => import('./../../modules/cliente/cliente.module').then(m => m.ClienteModule) }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
