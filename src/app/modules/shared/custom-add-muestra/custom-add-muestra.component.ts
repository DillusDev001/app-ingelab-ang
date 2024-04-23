import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { MuestraFrx } from 'src/app/shared/interfaces/app/frx-module/muestra-frx';

@Component({
  selector: 'app-custom-add-muestra',
  templateUrl: './custom-add-muestra.component.html',
  styleUrls: ['./custom-add-muestra.component.css']
})
export class CustomAddMuestraComponent {
  /** ---------------------------------- Variables de Inicio ---------------------------------- **/
  @Input() title!: string;
  @Input() class!: string;

  @Output() response = new EventEmitter<MuestraFrx | null>();

  // ================  ================ //
  formMuestra = new FormGroup({
    cod_interno: new FormControl('', [Validators.required]),
    descripcion: new FormControl('', [Validators.required]),
    observacion: new FormControl('', [Validators.required]),
  });

  /** -------------------------------------- Constructor -------------------------------------- **/
  constructor(
    private router: Router,
    private toast: HotToastService
  ) { }

  /** ---------------------------------------- OnInit ----------------------------------------- **/

  /** ---------------------------------------- Methods ---------------------------------------- **/

  /** ------------------------------------ Methods onClick ------------------------------------ **/
  onClick(sw:boolean){
    if(sw){
      if(this.formMuestra.valid){
        const cod_interno = String(this.formMuestra.controls.cod_interno.value);
        const descripcion = String(this.formMuestra.controls.descripcion.value);
        const observacion = String(this.formMuestra.controls.observacion.value);

        this.response.emit({
          cod_cotizacion: '',
          muestra_sec: 0,
          costo_muestra: 0,
          cod_interno: String(this.formMuestra.controls.cod_interno.value),
          descripcion: String(this.formMuestra.controls.descripcion.value),
          observacion: String(this.formMuestra.controls.observacion.value),
          muestra_parametros: [],

          fec_crea: '',
          user_crea: '',
          fec_mod: '',
          user_mod: ''
        });
      } else {
        this.customErrorToast('Datos necesarios!!!');
      }
    } else {
      this.response.emit(null);
    }
  }

  /** ----------------------------------- Consultas Sevidor ----------------------------------- **/

  /** ---------------------------------- Onclick file import ---------------------------------- **/

  /** ---------------------------------------- Receiver --------------------------------------- **/

  /** --------------------------------------- ShowAlerts -------------------------------------- **/
  customSuccessToast(msg: string) {
    this.toast.success(msg, {
      duration: 2000,
      style: {
        border: '1px solid #2e798c',
        padding: '16px',
        color: '#2b6273',
      },
      iconTheme: {
        primary: '#3494a6',
        secondary: '#FFFAEE',
      },
    });
  }

  customErrorToast(msg: string) {
    this.toast.error(msg, {
      duration: 2000,
      style: {
        border: '1px solid #ef445f',
        padding: '16px',
        color: '#ef445f',
      },
      iconTheme: {
        primary: '#ef445f',
        secondary: '#FFFAEE',
      },
    });
  }

  customLoadingToast(msg: string) {
    this.toast.loading(msg, {
      duration: 10000,
      style: {
        border: '1px solid #2b59c3',
        padding: '16px',
        color: '#2b59c3',
      },
      iconTheme: {
        primary: '#2b59c3',
        secondary: '#FFFAEE',
      },
    });
  }
}
