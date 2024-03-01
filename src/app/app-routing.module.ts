import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'auth/login', pathMatch: 'full' },

  { path: 'admin', loadChildren: () => import('./modules/admin/admin.module').then(m => m.AdminModule) },

  { path: 'auth', loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule) },

  { path: 'cotizacion', loadChildren: () => import('./modules/cotizacion/cotizacion.module').then(m => m.CotizacionModule) },

  { path: 'icons', loadChildren: () => import('./modules/icons/icons.module').then(m => m.IconsModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
