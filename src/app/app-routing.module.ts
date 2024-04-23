import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'auth', pathMatch: 'full' },

  { path: 'admin', loadChildren: () => import('./modules/admin/admin.module').then(m => m.AdminModule) },

  { path: 'auth', loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule) },

  // { path: 'servicios/especificos', loadChildren: () => import('./modules/servicios/especificos/especificos.module').then(m => m.EspecificosModule) },
  // { path: 'servicios/generales', loadChildren: () => import('./modules/servicios/generales/generales.module').then(m => m.GeneralesModule) },

  { path: 'icons', loadChildren: () => import('./modules/icons/icons.module').then(m => m.IconsModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
