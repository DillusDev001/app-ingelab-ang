import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { initFlowbite } from 'flowbite';
import { ApiResult } from 'src/app/shared/interfaces/api/api.result';
import { Cotizacion } from 'src/app/shared/interfaces/app/cotizacion';
import { Usuario } from 'src/app/shared/interfaces/app/usuario';
import { DataLocalStorage } from 'src/app/shared/interfaces/local/data-local-storage';
import { arrayBusquedaCotizacion } from 'src/app/shared/utils/local.array';
import { goLogin } from 'src/app/shared/utils/local.router';
import { deleteLocalStorageData, getLocalDataLogged } from 'src/app/shared/utils/local.storage';

@Component({
  selector: 'app-lista-cotizacion',
  templateUrl: './lista-cotizacion.component.html',
  styleUrls: ['./lista-cotizacion.component.css']
})
export class ListaCotizacionComponent {
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

  dataCotizacion: Cotizacion[] = [];

  // paginacion
  paginationArray: number[] = [];
  posPaginacion!: number;

  // Agregar Usuario
  showAgregar: boolean = false;


  /** -------------------------------------- Constructor -------------------------------------- **/
  constructor(
    private router: Router
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
  }

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
    this.showAgregar = true;
  }

  /** ----------------------------------- Consultas Sevidor ----------------------------------- **/

  /** ---------------------------------- Onclick file import ---------------------------------- **/

  /** ---------------------------------------- Receiver --------------------------------------- **/
  agregarCancelReceiver(event: boolean) {
    this.showAgregar = false;
  }

  agregarResultRegisterReceiver(event: boolean) {
    if (event) {
      this.showAgregar = false;
      this.isLoading = true;
      //this.getUsuarios();
    }
  }

  /** --------------------------------------- ShowAlerts -------------------------------------- **/
  onShowConfirmacion(sw: boolean) {
    this.alertConfirmacion = sw;
    //this.open = false; // Close Menú Lateral
  }

  onShowInfo() {
    this.alertInfo = true;
    //this.open = false; // Close Menú Lateral
    setTimeout(() => {
      this.alertInfo = false;
    }, 1000);
  }

  onShowError(sw: boolean) {
    this.alertError = sw;
    //this.open = false; // Close Menú Lateral
  }


  listenAlertConfirmation(event: boolean) {
    this.alertConfirmacion = false;
    if (event) {
      this.msgAlert = 'Se ha eliminado correctamente!!!';
      this.onShowInfo();
    } else {
      this.msgAlert = 'Acción cancelada';
      this.alertError = true;
    }
  }

  listenAlertError(event: boolean) {
    if (event) this.alertError = false;
  }
}
