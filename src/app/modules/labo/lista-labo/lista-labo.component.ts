import { formatDate } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { initFlowbite } from 'flowbite';
import { ApiResult } from 'src/app/shared/interfaces/api/api.result';
import { Recepcion } from 'src/app/shared/interfaces/app/recepcion';
import { Usuario } from 'src/app/shared/interfaces/app/sesion-module/usuario';
import { DataLocalStorage } from 'src/app/shared/interfaces/local/data-local-storage';
import { RecepcionFrxService } from 'src/app/shared/services/frx-module/recepcionFrx/recepcion-frx.service';
import { arrayBusquedaCotizacion } from 'src/app/shared/utils/local.array';
import { goLogin } from 'src/app/shared/utils/local.router';
import { deleteLocalStorageData, getLocalDataLogged } from 'src/app/shared/utils/local.storage';

@Component({
  selector: 'app-lista-labo',
  templateUrl: './lista-labo.component.html',
  styleUrls: ['./lista-labo.component.css']
})
export class ListaLaboComponent {
  /** -------------------------------------- Constructor -------------------------------------- **/
  constructor(
    private router: Router,
    private toast: HotToastService,
    private recepcionFrxService: RecepcionFrxService
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
    this.getMiListaRecepcionFrx();
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

  // Mensaje Alert
  msgAlert: string = '';

  // ================  ================ //
  formBusqueda = new FormGroup({
    busqueda: new FormControl('cod_cotizacion', []),
    value: new FormControl('', [])
  });

  dataBusquedaCotizacion = arrayBusquedaCotizacion;

  dataRecepcion: Recepcion[] = [];

  // Agregar/Ver Recpcion
  showRecepcionFRX: boolean = false;

  // Como mostrar FRX FORMULARIO
  showFormularioFRX: string = '';

  // CodeFormulario Send
  codeFormularioFRX: string = '';



  /** ---------------------------------------- Methods ---------------------------------------- **/

  /** ------------------------------------ Methods onClick ------------------------------------ **/
  onClickBusqueda() {
    const value = String(this.formBusqueda.controls.value.value);
    this.buscarRecepcionFRX(value);
  }

  onClickAgregar() { }

  onClickListaElement(index: number) {
    this.showFormularioFRX = 'ver';
    this.codeFormularioFRX = this.dataRecepcion[index].cod_cotizacion;
    this.showRecepcionFRX = true;
  }

  onClickIniciar(index: number) {
    const x = this.dataRecepcion[index] as Recepcion;

    const data = {
      user_asignado: this.userLogeado.user,
      fec_ini: formatDate(new Date(), 'yyyy-MM-dd', 'es'),
      user_mod: this.userLogeado.user,
    }

    this.actualizarRecepcionFRX(x.cod_cotizacion, data);
  }

  onClickFinalizar(index: number) {
    const x = this.dataRecepcion[index] as Recepcion;

    if (x.user_asignado == this.userLogeado.user) {
      const data = {
        user_asignado: this.userLogeado.user,
        fec_fin: formatDate(new Date(), 'yyyy-MM-dd', 'es'),
        user_mod: this.userLogeado.user,
      }

      this.actualizarRecepcionFRX(x.cod_cotizacion, data);
    } else {
      this.customErrorToast('El usuario actual no es el mismo que ha iniciado el trabajo');
    }
  }

  /** ----------------------------------- Consultas Sevidor ----------------------------------- **/
  getMiListaRecepcionFrx() {
    this.dataRecepcion = [];

    this.recepcionFrxService.recepcionFrxMiLista(this.userLogeado.user).subscribe(result => {
      result as ApiResult;

      if (result.rows > 0) {
        this.dataRecepcion = result.data;
      } else {
        //this.customErrorToast(result.message);
      }
      this.isLoading = false;
    });
  }

  buscarRecepcionFRX(value: string) {
    this.recepcionFrxService.recepcionFrxGetUno(value).subscribe(result => {
      result as ApiResult;

      if (result.boolean) {
        this.dataRecepcion = result.data;
      } else {
        this.customErrorToast(result.message);
      }
    });
  }

  actualizarRecepcionFRX(cod_cotizacion: string, data: any) {
    this.isLoading = true;
    this.recepcionFrxService.recepcionFrxActualizar(cod_cotizacion, data).subscribe(result => {
      result as ApiResult;

      if (result.boolean) {
        this.getMiListaRecepcionFrx();
      } else {
        this.customErrorToast(result.message);
      }
      this.isLoading = false;
    });
  }

  /** ---------------------------------- Onclick file import ---------------------------------- **/

  /** ---------------------------------------- Receiver --------------------------------------- **/
  recepcionResponse(event: boolean) {
    this.showRecepcionFRX = false;
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
