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
      { path: 'cotizacion', loadChildren: () => import('./../cotizacion/cotizacion.module').then(m => m.CotizacionModule) },
      { path: 'graficos', loadChildren: () => import('./../graficos/graficos.module').then(m => m.GraficosModule) },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
