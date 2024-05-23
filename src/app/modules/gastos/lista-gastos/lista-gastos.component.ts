import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { initFlowbite } from 'flowbite';
import { ApiResult } from 'src/app/shared/interfaces/api/api.result';
import { Gasto } from 'src/app/shared/interfaces/app/gastos-module/gasto';
import { Usuario } from 'src/app/shared/interfaces/app/sesion-module/usuario';
import { DataLocalStorage } from 'src/app/shared/interfaces/local/data-local-storage';
import { GastoService } from 'src/app/shared/services/gasto-module/gasto/gasto.service';
import { arrayBusquedaGasto } from 'src/app/shared/utils/local.array';
import { goLogin } from 'src/app/shared/utils/local.router';
import { deleteLocalStorageData, getLocalDataLogged } from 'src/app/shared/utils/local.storage';

@Component({
  selector: 'app-lista-gastos',
  templateUrl: './lista-gastos.component.html',
  styleUrls: ['./lista-gastos.component.css']
})
export class ListaGastosComponent {
  /** -------------------------------------- Constructor -------------------------------------- **/
  constructor(
    private router: Router,
    private gastoService: GastoService,
    private toast: HotToastService
  ) {
    if (getLocalDataLogged() != null) {
      this.dataLocalStorage = getLocalDataLogged();
      if (this.dataLocalStorage.usuario != null) {
        this.userLogeado = this.dataLocalStorage.usuario;
      } else {
        deleteLocalStorageData();
        goLogin(this.router);
      }
    } else {
      deleteLocalStorageData();
      goLogin(this.router);
    }
  }

  /** ---------------------------------------- OnInit ----------------------------------------- **/
  ngOnInit(): void {
    initFlowbite();

    this.getListaGastos();
  }

  /** ---------------------------------- Variables de Inicio ---------------------------------- **/
  // ================ INICIO ================ //
  // Data Local Storeage - Variable
  dataLocalStorage: DataLocalStorage = {
    usuario: null,
    loggedDate: ''
  }

  // Usuario logeado
  userLogeado!: Usuario;

  // loading spinner
  isLoading: boolean = true;

  // Info Alert
  alertInfo: boolean = false;

  // Confirmacion Alert
  alertConfirmacion: boolean = false;

  // Error Alert
  alertError: boolean = false;

  // Mensaje Alert
  msgAlert: string = '';

  // ================  ================ //
  formBusqueda = new FormGroup({
    busqueda: new FormControl('codigo_gasto', [Validators.required]),
    value: new FormControl('', [Validators.required])
  });

  dataBusquedaGasto = arrayBusquedaGasto;

  dataGastos: Gasto[] = [];

  // paginacion
  paginationArray: number[] = [];
  posPaginacion!: number;

  // Agregar Gasto
  showAgregar: boolean = false;

  // Como mostrar Gasto
  agregarGastoType: string = '';

  // Codigo Gasto Send
  codigoGasto: string = '';

  /** ---------------------------------------- Methods ---------------------------------------- **/

  /** ------------------------------------ Methods onClick ------------------------------------ **/
  showListaNext(n: number) {
    this.posPaginacion = n;

    let cant = n * 10;
    let ini = cant - 10;
    let fin = 0;
    if ((ini + 9) <= this.dataGastos.length - 1) {
      fin = ini + 9;
    } else {
      fin = this.dataGastos.length - 1;
    }

    this.dataGastos = [];
    while (ini <= fin) {
      this.dataGastos.push(this.dataGastos[ini]);
      ini++;
    }

  }

  anteriorLista() {
    if ((this.posPaginacion - 1) > 0) {
      this.showListaNext(this.posPaginacion - 1);
    }
  }

  siguienteLista() {
    if ((this.posPaginacion + 1) <= this.paginationArray.length) {
      this.showListaNext(this.posPaginacion + 1);
    }
  }

  onClickBusqueda() {
    if(this.formBusqueda.valid){
      this.isLoading = true;
      this.getListaBusqueda();
    } else {
      if(this.formBusqueda.controls.busqueda.valid && this.formBusqueda.controls.value.invalid){
        this.isLoading = true;
        this.getListaGastos();
      }
    }
  }

  onClickAgregar() {
    this.agregarGastoType = 'agregar';
    this.showAgregar = true;
  }

  onClickListaElement(index: number) {
    this.agregarGastoType = 'ver';
    this.codigoGasto = this.dataGastos[index].codigo_gasto;
    this.showAgregar = true;
  }

  onClickActulizar(index: number) { }

  /** ----------------------------------- Consultas Sevidor ----------------------------------- **/
  getListaGastos() {
    this.gastoService.gastoGetLista().subscribe(result => {
      result as ApiResult;

      if (result.boolean) {
        this.dataGastos = result.data as Gasto[];
      } else {
        //this.customErrorToast(result.message);
      }
      this.showAgregar = false;
      this.isLoading = false;
    });
  }

  getListaBusqueda(){
    const attribute = String(this.formBusqueda.controls.busqueda.value);
    const value = String(this.formBusqueda.controls.value.value);
    this.gastoService.gastoGetBusqueda(attribute, value).subscribe(result => {
      result as ApiResult;

      this.dataGastos = [];

      if (result.boolean) {
        this.dataGastos = result.data as Gasto[];
      } else {
        //this.customErrorToast(result.message);
      }
      this.isLoading = false;
    });
  }

  /** ---------------------------------- Onclick file import ---------------------------------- **/

  /** ---------------------------------------- Receiver --------------------------------------- **/
  agregarGastoResponse(event: boolean) {
    if (event) {
      this.isLoading = true;
      this.getListaGastos();
    } else {
      this.showAgregar = false;
    }
  }

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
