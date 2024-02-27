import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IconsRoutingModule } from './icons-routing.module';
import { HtmlIconsComponent } from './html-icons/html-icons.component';


@NgModule({
  declarations: [
    HtmlIconsComponent
  ],
  imports: [
    CommonModule,
    IconsRoutingModule
  ]
})
export class IconsModule { }
