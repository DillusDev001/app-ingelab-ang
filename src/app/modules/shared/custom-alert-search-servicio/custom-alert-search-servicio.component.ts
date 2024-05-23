import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { initFlowbite } from 'flowbite';
import { ApiResult } from 'src/app/shared/interfaces/api/api.result';
import { Parametro } from 'src/app/shared/interfaces/app/frx-module/parametro';
import { Servicio } from 'src/app/shared/interfaces/app/servicio-module/servicio';
import { ServicioService } from 'src/app/shared/services/servicio-module/servicio/servicio.service';
import { arrayBusquedaParametro } from 'src/app/shared/utils/local.array';

@Component({
  selector: 'app-custom-alert-search-servicio',
  templateUrl: './custom-alert-search-servicio.component.html',
  styleUrls: ['./custom-alert-search-servicio.component.css']
})
export class CustomAlertSearchServicioComponent implements OnInit {
  @Output() response: EventEmitter<Servicio | null> = new EventEmitter();

  /** ---------------------------------- Variables de Inicio ---------------------------------- **/
  _ID_TIPO_SERVICIO: number = 1; // Generales

  result!: ApiResult;

  dataBusqueda = arrayBusquedaParametro;

  dataResult!: Servicio[];

  isLoading:boolean = true;

  // ================  ================ //
  tableHeadParametro: string[] = ['#', 'Servicio', 'Descripción'];

  // ================  ================ //
  formBusqueda = new FormGroup({
    busqueda: new FormControl('nombre', [Validators.required]),
    value: new FormControl('', [Validators.required])
  });

  /** -------------------------------------- Constructor -------------------------------------- **/
  constructor(
    private router: Router,
    private servicioService: ServicioService,
    private toast: HotToastService
  ) {

  }

  /** ---------------------------------------- OnInit ----------------------------------------- **/
  ngOnInit(): void {
    initFlowbite();

    this.getListaGeneralesAll();
  }

  /** ---------------------------------------- Methods ---------------------------------------- **/

  /** ------------------------------------ Methods onClick ------------------------------------ **/
  async onClickBuscar() {
    if (this.formBusqueda.valid) {
      this.isLoading = true;
      const value = String(this.formBusqueda.controls.value.value);
      this.getListaByNombre(value);
    }
  }

  onClickItem(index: number) {
    this.response.emit(this.dataResult[index]);
  }

  onClickCancel() {
    this.response.emit(null);
  }

  /** ----------------------------------- Consultas Sevidor ----------------------------------- **/
  getListaGeneralesAll() {
    this.servicioService.servicioGetListaByTipoServicio(this._ID_TIPO_SERVICIO).subscribe(result => {
      result as ApiResult;

      if (result.boolean) {
        this.dataResult = result.data as Servicio[];
        this.customSuccessToast(result.message);
      } else {
        this.dataResult = [];
        this.customErrorToast(result.message);
      }
      this.isLoading = false;
    });
  }

  getListaByNombre(nombre: string) {
    this.servicioService.servicioGetByNombre(nombre).subscribe(result => {
      result as ApiResult;

      if (result.boolean) {
        this.dataResult = result.data as Servicio[];
        this.customSuccessToast(result.message);
      } else {
        this.dataResult = [];
        this.customErrorToast(result.message);
      }
    });
  }

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
