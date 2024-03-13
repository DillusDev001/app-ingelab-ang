import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HashLocationStrategy, LocationStrategy, registerLocaleData } from '@angular/common';

import { HttpClientModule } from '@angular/common/http';

import { HotToastModule } from '@ngneat/hot-toast';

import localeES from "@angular/common/locales/es";
import { NgApexchartsModule } from 'ng-apexcharts';
registerLocaleData(localeES, "es");

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    HotToastModule.forRoot(),
    NgApexchartsModule,
    
  ],
  providers: [
    { provide: LocationStrategy, useClass: HashLocationStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
