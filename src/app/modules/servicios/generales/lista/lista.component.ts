import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { initFlowbite } from 'flowbite';
import { ApiResult } from 'src/app/shared/interfaces/api/api.result';
import { CotizacionGeneral } from 'src/app/shared/interfaces/app/servicio-module/cotizacion-general';
import { Usuario } from 'src/app/shared/interfaces/app/sesion-module/usuario';
import { DataLocalStorage } from 'src/app/shared/interfaces/local/data-local-storage';
import { CotizacionGeneralService } from 'src/app/shared/services/servicio-generale-module/cotizacion-general/cotizacion-general.service';
import { arrayBusquedaCotizacion } from 'src/app/shared/utils/local.array';
import { goLogin } from 'src/app/shared/utils/local.router';
import { deleteLocalStorageData, getLocalDataLogged } from 'src/app/shared/utils/local.storage';

@Component({
  selector: 'app-lista-generales',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.css']
})
export class ListaComponent implements OnInit {
  /** -------------------------------------- Constructor -------------------------------------- **/
  constructor(
    private router: Router,
    private cotizacionGeneralService: CotizacionGeneralService,
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

    this.getListaCotizacionGeneral();
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
  isLoading: boolean = false;

  // Info Alert
  alertInfo: boolean = false;

  // Confirmacion Alert
  alertConfirmacion: boolean = false;

  // Error Alert
  alertError: boolean = false;

  // Mensaje Alert
  msgAlert: string = '';

  result!: ApiResult;

  // ================  ================ //
  formBusqueda = new FormGroup({
    busqueda: new FormControl('cod_cotizacion', []),
    value: new FormControl('', [])
  });

  dataBusquedaCotizacion = arrayBusquedaCotizacion;

  dataCotizacion: CotizacionGeneral[] = [];

  // paginacion
  paginationArray: number[] = [];
  posPaginacion!: number;

  // Agregar Usuario
  showAgregar: boolean = false;

    // Como mostrar FRX FORMULARIO
    showFormularioFRX: string = '';

    // CodeFormulario Send
    codeFormularioFRX: string = '';


  /** ---------------------------------------- Methods ---------------------------------------- **/
  showListaNext(n: number) {
    this.posPaginacion = n;

    let cant = n * 10;
    let ini = cant - 10;
    let fin = 0;
    if ((ini + 9) <= this.dataCotizacion.length - 1) {
      fin = ini + 9;
    } else {
      fin = this.dataCotizacion.length - 1;
    }

    this.dataCotizacion = [];
    while (ini <= fin) {
      this.dataCotizacion.push(this.dataCotizacion[ini]);
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

  /** ------------------------------------ Methods onClick ------------------------------------ **/
  onClickBusqueda() { }

  onClickAgregar() {
    this.showFormularioFRX = 'agregar';
    this.showAgregar = true;
  }

  onClickListaElement(index: number){
    this.showFormularioFRX = 'ver';
    this.codeFormularioFRX = this.dataCotizacion[index].cod_cotizacion;
    this.showAgregar = true;
  }

  onClickActulizar(index: number){
    this.showFormularioFRX = 'editar';
    this.codeFormularioFRX = this.dataCotizacion[index].cod_cotizacion;
    this.showAgregar = true;
  }

  /** ----------------------------------- Consultas Sevidor ----------------------------------- **/
  getListaCotizacionGeneral(){
    this.dataCotizacion = []
    this.cotizacionGeneralService.cotizacionGetLista().subscribe(result => {
      result as ApiResult;

      if (result.rows > 0) {
        for(let i = result.data.length - 1; i >= 0; i--){
          this.dataCotizacion.push(result.data[i] as CotizacionGeneral);
        }

        // Paginación
        let nPaginacion = Math.trunc(this.dataCotizacion.length / 10) + 1;
        this.paginationArray = Array.from({ length: nPaginacion }, (_, i) => i + 1);
      } else {
        this.customErrorToast(result.message);
      }
    });
  }

  /** ---------------------------------- Onclick file import ---------------------------------- **/

  /** ---------------------------------------- Receiver --------------------------------------- **/
  cotizacionGeneralResponse(event: boolean) {
    if (event) {
      //this.isLoading = true;
      this.getListaCotizacionGeneral();
    }

    this.showAgregar = false;
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
