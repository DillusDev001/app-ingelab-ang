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
import { CustomMenuButtonComponent } from './custom-menu-button/custom-menu-button.component';
import { CustomSubMenuButtonComponent } from './custom-sub-menu-button/custom-sub-menu-button.component';
import { CustomTitleComponent } from './custom-title/custom-title.component';
import { CustomIconComponent } from './custom-icon/custom-icon.component';
import { CustomLabel1Component } from './custom-label1/custom-label1.component';
import { CustomLabel0Component } from './custom-label0/custom-label0.component';
import { CustomSubTitleComponent } from './custom-sub-title/custom-sub-title.component';
import { CustomLabel2Component } from './custom-label2/custom-label2.component';



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
    CustomMenuButtonComponent,
    CustomSubMenuButtonComponent,
    CustomTitleComponent,
    CustomIconComponent,
    CustomLabel0Component,
    CustomLabel1Component,
    CustomLabel2Component,
    CustomSubTitleComponent,
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
    AddEmpresaComponent,
    AddPersonaComponent,
    CustomMenuButtonComponent,
    CustomSubMenuButtonComponent,
    CustomTitleComponent,
    CustomIconComponent,
    CustomLabel0Component,
    CustomLabel1Component,
    CustomLabel2Component,
    CustomSubTitleComponent,

    ReactiveFormsModule
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class SharedModule { }
