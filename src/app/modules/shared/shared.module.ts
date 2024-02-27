import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CustomInputComponent } from './custom-input/custom-input.component';
import { CustomDropBoxComponent } from './custom-drop-box/custom-drop-box.component';

import { CustomAlertConfirmationComponent } from './custom-alert-confirmation/custom-alert-confirmation.component';
import { CustomAlertErrorComponent } from './custom-alert-error/custom-alert-error.component';
import { CustomAlertInfoComponent } from './custom-alert-info/custom-alert-info.component';
import { CustomAlertSearchComponent } from './custom-alert-search/custom-alert-search.component';
import { CustomLoadingComponent } from './custom-loading/custom-loading.component';
import { CustomButtonComponent } from './custom-button/custom-button.component';
import { AddEmpresaComponent } from './add-empresa/add-empresa.component';
import { AddPersonaComponent } from './add-persona/add-persona.component';



@NgModule({
  declarations: [
    CustomInputComponent,
    CustomDropBoxComponent,
    
    CustomAlertConfirmationComponent,
    CustomAlertErrorComponent,
    CustomAlertInfoComponent,
    CustomAlertSearchComponent,
    CustomLoadingComponent,
    CustomButtonComponent,
    AddEmpresaComponent,
    AddPersonaComponent,
  ],
  exports: [
    CustomInputComponent,
    CustomDropBoxComponent,

    CustomAlertConfirmationComponent,
    CustomAlertErrorComponent,
    CustomAlertInfoComponent,
    CustomAlertSearchComponent,
    CustomLoadingComponent,
    CustomButtonComponent,
    ReactiveFormsModule
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class SharedModule { }
