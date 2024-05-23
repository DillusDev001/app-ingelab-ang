import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { initFlowbite } from 'flowbite';
import { ApiResult } from 'src/app/shared/interfaces/api/api.result';
import { Parametro } from 'src/app/shared/interfaces/app/frx-module/parametro';
import { ParametroFrxService } from 'src/app/shared/services/frx-module/parametro-frx/parametro-frx.service';
import { arrayBusquedaParametro } from 'src/app/shared/utils/local.array';

@Component({
  selector: 'app-custom-alert-search-parametro',
  templateUrl: './custom-alert-search-parametro.component.html',
  styleUrls: ['./custom-alert-search-parametro.component.css']
})
export class CustomAlertSearchParametroComponent implements OnInit {
  @Input() type!: string;
  @Output() response: EventEmitter<Parametro | null> = new EventEmitter();

  /** ---------------------------------- Variables de Inicio ---------------------------------- **/
  result!: ApiResult;

  dataBusqueda = arrayBusquedaParametro;

  dataResult!: Parametro[];

  isLoading: boolean = true;

  // ================  ================ //
  tableHeadParametro: string[] = ['#', 'Parámetro', 'Costo Directo', 'Costo Variable'];

  // ================  ================ //
  formBusqueda = new FormGroup({
    busqueda: new FormControl('nombre', [Validators.required]),
    value: new FormControl('', [Validators.required])
  });

  /** -------------------------------------- Constructor -------------------------------------- **/
  constructor(
    private router: Router,
    private parametroFrxService: ParametroFrxService,
    private toast: HotToastService
  ) {

  }

  /** ---------------------------------------- OnInit ----------------------------------------- **/
  ngOnInit(): void {
    initFlowbite();

    this.getListaParametros();
  }

  /** ---------------------------------------- Methods ---------------------------------------- **/

  /** ------------------------------------ Methods onClick ------------------------------------ **/
  async onClickBuscar() {
    if (this.formBusqueda.valid) {
      this.isLoading = true;
      const value = String(this.formBusqueda.controls.value.value);

      this.buscarParametro(value);
    }
  }

  onClickItem(index: number) {
    this.response.emit(this.dataResult[index]);
  }

  onClickCancel() {
    this.response.emit(null);
  }

  /** ----------------------------------- Consultas Sevidor ----------------------------------- **/
  buscarParametro(value: string) {
    this.parametroFrxService.parametroGet(value).subscribe(result => {
      result as ApiResult;

      if (result.boolean) {
        this.dataResult = result.data as Parametro[];
        this.customSuccessToast(result.message);
      } else {
        this.dataResult = [];
        this.customErrorToast(result.message);
      }
      this.isLoading = false;
    });
  }

  getListaParametros() {
    this.parametroFrxService.parametroGetLista().subscribe(result => {
      result as ApiResult;

      if (result.boolean) {
        this.dataResult = result.data as Parametro[];
        //this.customSuccessToast(result.message);
      } else {
        this.dataResult = [];
        this.customErrorToast(result.message);
      }
      this.isLoading = false;
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
