import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AddEmpresaComponent } from './add-empresa/add-empresa.component';
import { AddPersonaComponent } from './add-persona/add-persona.component';
import { CustomAddServicioComponent } from './custom-add-servicio/custom-add-servicio.component';
import { CustomAddSubServicioComponent } from './custom-add-sub-servicio/custom-add-sub-servicio.component';
import { CustomAlertConfirmationComponent } from './custom-alert-confirmation/custom-alert-confirmation.component';
import { CustomAlertDatePickerComponent } from './custom-alert-date-picker/custom-alert-date-picker.component';
import { CustomAlertErrorComponent } from './custom-alert-error/custom-alert-error.component';
import { CustomAlertInfoComponent } from './custom-alert-info/custom-alert-info.component';
import { CustomAlertInputComponent } from './custom-alert-input/custom-alert-input.component';
import { CustomAlertSearchComponent } from './custom-alert-search/custom-alert-search.component';
import { CustomButtonComponent } from './custom-button/custom-button.component';
import { CustomCardServicioComponent } from './custom-card-servicio/custom-card-servicio.component';
import { CustomCardSubServicioComponent } from './custom-card-sub-servicio/custom-card-sub-servicio.component';
import { CustomCodeComponent } from './custom-code/custom-code.component';
import { CustomDropBoxComponent } from './custom-drop-box/custom-drop-box.component';
import { CustomIconComponent } from './custom-icon/custom-icon.component';
import { CustomInputComponent } from './custom-input/custom-input.component';
import { CustomLabel0Component } from './custom-label0/custom-label0.component';
import { CustomLabel1Component } from './custom-label1/custom-label1.component';
import { CustomLabel2Component } from './custom-label2/custom-label2.component';
import { CustomLabel3Component } from './custom-label3/custom-label3.component';
import { CustomLoadingComponent } from './custom-loading/custom-loading.component';
import { CustomMenuButtonComponent } from './custom-menu-button/custom-menu-button.component';
import { CustomSimpleCardComponent } from './custom-simple-card/custom-simple-card.component';
import { CustomSubMenuButtonComponent } from './custom-sub-menu-button/custom-sub-menu-button.component';
import { CustomSubTitleComponent } from './custom-sub-title/custom-sub-title.component';
import { CustomTabButtonComponent } from './custom-tab-button/custom-tab-button.component';
import { CustomTitleComponent } from './custom-title/custom-title.component';
import { CustomAlertSearchParametroComponent } from './custom-alert-search-parametro/custom-alert-search-parametro.component';
import { CustomAlertSearchServicioComponent } from './custom-alert-search-servicio/custom-alert-search-servicio.component';
import { CustomAddMuestraComponent } from './custom-add-muestra/custom-add-muestra.component';
import { CustomAlertSearchEmpresaComponent } from './custom-alert-search-empresa/custom-alert-search-empresa.component';




@NgModule({
  declarations: [
    AddEmpresaComponent,
    AddPersonaComponent,
    CustomAddMuestraComponent,
    CustomAddServicioComponent,
    CustomAddSubServicioComponent,
    CustomAlertConfirmationComponent,
    CustomAlertDatePickerComponent,
    CustomAlertErrorComponent,
    CustomAlertInfoComponent,
    CustomAlertInputComponent,
    CustomAlertSearchComponent,
    CustomAlertSearchEmpresaComponent,
    CustomAlertSearchParametroComponent,
    CustomAlertSearchServicioComponent,
    CustomButtonComponent,
    CustomCardServicioComponent,
    CustomCardSubServicioComponent,
    CustomCodeComponent,
    CustomDropBoxComponent,
    CustomIconComponent,
    CustomInputComponent,
    CustomLabel0Component,
    CustomLabel1Component,
    CustomLabel2Component,
    CustomLabel3Component,
    CustomLoadingComponent,
    CustomMenuButtonComponent,
    CustomSimpleCardComponent,
    CustomSubMenuButtonComponent,
    CustomSubTitleComponent,
    CustomTabButtonComponent,
    CustomTitleComponent,

  ],
  exports: [
    AddEmpresaComponent,
    AddPersonaComponent,
    CustomAddMuestraComponent,
    CustomAddServicioComponent,
    CustomAddSubServicioComponent,
    CustomAlertConfirmationComponent,
    CustomAlertDatePickerComponent,
    CustomAlertErrorComponent,
    CustomAlertInfoComponent,
    CustomAlertInputComponent,
    CustomAlertSearchComponent,
    CustomAlertSearchEmpresaComponent,
    CustomAlertSearchParametroComponent,
    CustomAlertSearchServicioComponent,
    CustomButtonComponent,
    CustomCardServicioComponent,
    CustomCardSubServicioComponent,
    CustomCodeComponent,
    CustomDropBoxComponent,
    CustomIconComponent,
    CustomInputComponent,
    CustomLabel0Component,
    CustomLabel1Component,
    CustomLabel2Component,
    CustomLabel3Component,
    CustomLoadingComponent,
    CustomMenuButtonComponent,
    //CustomSimpleCardComponent,
    CustomSubMenuButtonComponent,
    CustomSubTitleComponent,
    CustomTabButtonComponent,
    CustomTitleComponent,

    ReactiveFormsModule
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class SharedModule { }
