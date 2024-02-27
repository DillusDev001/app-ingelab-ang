import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HtmlIconsComponent } from './html-icons/html-icons.component';

const routes: Routes = [
  { path: 'html-icons', component: HtmlIconsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IconsRoutingModule { }
