import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { initFlowbite } from 'flowbite';
import { ApiResult } from 'src/app/shared/interfaces/api/api.result';
import { Usuario } from 'src/app/shared/interfaces/app/sesion-module/usuario';
import { DataLocalStorage } from 'src/app/shared/interfaces/local/data-local-storage';
import { ResponseEvent } from 'src/app/shared/interfaces/event/response.event';
import { goLogin } from 'src/app/shared/utils/local.router';
import { deleteLocalStorageData, getLocalDataLogged } from 'src/app/shared/utils/local.storage';
import { Servicio } from 'src/app/shared/interfaces/app/servicio-module/servicio';
import { SubServicio } from 'src/app/shared/interfaces/app/servicio-module/sub-servicio';
import { ServicioService } from 'src/app/shared/services/servicio-module/servicio/servicio.service';
import { TipoServicioService } from 'src/app/shared/services/servicio-module/tipo-servicio/tipo-servicio.service';
import { SubServicioService } from 'src/app/shared/services/servicio-module/sub-servicio/sub-servicio.service';

@Component({
  selector: 'app-mantenimiento-generales',
  templateUrl: './mantenimiento.component.html',
  styleUrls: ['./mantenimiento.component.css']
})
export class MantenimientoComponent implements OnInit {
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

  result!: ApiResult;

  // ================  ================ //
  _ID_TIPO_SERVICIO_GENERAL: number = 1; // id de servicios general

  showAlertAddServicio: boolean = false; // muestra el alert de Input servicio
  showAlertAddSubServicio: boolean = false; // muestra el alert de Input servicio

  selectedServicio: string = ''; // Servicio seleccionado

  id_servicio_selected: number = 0; // Id del servicio seleccionado
  id_sub_servicio_selected: number = 0; // Id del servicio seleccionado

  dataServicios: Servicio[] = []; // Data de Servicios de id_tipo_servicio
  dataServicioSubServicios: SubServicio[] = []; // Data de SubServicio de id_servicio_selected

  showAlertTypeServicio: string = '';
  showAlertTypeSubServicio: string = '';

  // labels para alert input
  lblTitleServicio: string = 'Agregar Servicio';
  lblTitleSubServicio: string = 'Agregar Sub-Servicio';

  objServicioEdit: Servicio | null = null;
  objSubServicioEdit: SubServicio | null = null;

  showCardCuenta: boolean = false;

  labelCuenta: string = '';

  idServicioSend: number = -1;

  /** -------------------------------------- Constructor -------------------------------------- **/
  constructor(
    private router: Router,
    private toast: HotToastService,
    private servicioService: ServicioService,
    private subServicioService: SubServicioService,
    private tipoServicioService: TipoServicioService,
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

    this.getListaServicios();
  }

  /** ---------------------------------------- Methods ---------------------------------------- **/

  /** ------------------------------------ Methods onClick ------------------------------------ **/
  onClickSelectCardServicio(strServicio: string, i: number) {
    if (strServicio !== this.selectedServicio) {
      this.selectedServicio = strServicio;
      this.id_servicio_selected = this.dataServicios[i].id_servicio;

      this.getListaSubServicios();
    }
  }

  onClickAgregarServicio() {
    this.showAlertTypeServicio = 'Agregar';
    this.showAlertAddServicio = true;
  }

  onClickAgregarSubServicio() {
    if (this.id_servicio_selected !== 0) {
      this.showAlertTypeSubServicio = 'Agregar';
      this.showAlertAddSubServicio = true;
    } else {
      this.customErrorToast('Seleccione un servicio de la columna derecha.');
    }
  }

  onClickEditarSubServicio(index: number) {
    this.objSubServicioEdit = this.dataServicioSubServicios[index];
    this.id_sub_servicio_selected = this.objSubServicioEdit.id_sub_servicio;
    this.showAlertTypeSubServicio = 'Editar';
    this.showAlertAddSubServicio = true;
  }

  onClickRemoveSubServicio(index: number) { }

  /** ----------------------------------- Consultas Sevidor ----------------------------------- **/

  // ================ Servicio ================ //
  getListaServicios() {
    this.servicioService.servicioGetListaByTipoServicio(this._ID_TIPO_SERVICIO_GENERAL).subscribe(result => {
      result as ApiResult;
      this.dataServicios = result.data;
      this.isLoading = false;
    });
  }

  agregarServicio(nombre: string, descripcion: string) {
    const data = {
      nombre: nombre,
      descripcion: descripcion,
      id_tipo_servicio: this._ID_TIPO_SERVICIO_GENERAL,
      user_crea: this.userLogeado.user,
      user_mod: this.userLogeado.user,
    }
    this.servicioService.servicioRegistro(data).subscribe(result => {
      result as ApiResult;
      console.log(result);

      if (result.boolean) {
        this.customSuccessToast(result.message);
        this.getListaServicios();
      } else {
        this.customErrorToast(result.message);
      }
    });
  }

  editarServicio(nombre: string, descripcion: string) {
    const data = {
      nombre: nombre,
      descripcion: descripcion,
      user_mod: this.userLogeado.user,
    }

    this.servicioService.servicioActualizar(this.id_servicio_selected, data).subscribe(result => {
      result as ApiResult;

      if (result.boolean) {
        this.customSuccessToast(result.message);
        this.getListaServicios();
      } else {
        this.customErrorToast(result.message);
      }
    });
  }

  // ================ Sub-Servicio ================ //
  getListaSubServicios() {
    this.subServicioService.subServicioGetLista(this.id_servicio_selected).subscribe(result => {
      result as ApiResult;
      this.dataServicioSubServicios = result.data;
    });
  }

  agregarSubServicio(nombre: string, descripcion: string) {
    const data = {
      id_servicio: this.id_servicio_selected,
      nombre: nombre,
      descripcion: descripcion,
      user_crea: this.userLogeado.user,
      user_mod: this.userLogeado.user,
    }

    this.subServicioService.subServicioRegistro(data).subscribe(result => {
      result as ApiResult;

      if (result.boolean) {
        this.customSuccessToast(result.message);
        this.getListaSubServicios();
      } else {
        this.customErrorToast(result.message);
      }
    });
  }

  editarSubServicio(nombre: string, descripcion: string) {
    const data = {
      nombre: nombre,
      descripcion: descripcion,
      user_mod: this.userLogeado.user,
    }

    this.subServicioService.subServicioActualizar(this.id_sub_servicio_selected, this.id_servicio_selected, data).subscribe(result => {
      result as ApiResult;

      if (result.boolean) {
        this.customSuccessToast(result.message);
        this.getListaSubServicios();
      } else {
        this.customErrorToast(result.message);
      }
    });
  }

  /** ---------------------------------- Onclick file import ---------------------------------- **/

  /** ---------------------------------------- Receiver --------------------------------------- **/
  reciveCustomInputServicio(event: ResponseEvent) {
    if (event.bool) {
      if (this.showAlertTypeServicio === 'Agregar') {
        this.agregarServicio(event.data['value1'], event.data['value2']);
        this.showAlertAddServicio = false;
      } else if (this.showAlertTypeServicio === 'Editar') {
        this.showAlertAddServicio = false;
        this.lblTitleServicio = 'Agregar Servicio';
        this.showAlertTypeServicio = 'Agregar';
        this.objServicioEdit = null;

        this.editarServicio(event.data['value1'], event.data['value2']);
      }
    } else {
      // CANCELAR
      this.showAlertAddServicio = event.bool;
      this.lblTitleServicio = 'Agregar Servicio';
      this.showAlertTypeServicio = 'Agregar';
      this.objServicioEdit = null;
    }
  }

  reciveCustomInputSubServicio(event: ResponseEvent) {
    if (event.bool) {
      if (this.showAlertTypeSubServicio === 'Agregar') {
        this.showAlertAddSubServicio = false;
        this.agregarSubServicio(event.data['nombre'], event.data['descripcion']);
      } else if (this.showAlertTypeSubServicio === 'Editar') {
        this.showAlertAddSubServicio = false;
        this.lblTitleSubServicio = 'Agregar Sub-Servicio';
        this.showAlertTypeSubServicio = 'Agregar';
        this.objSubServicioEdit = null;

        this.editarSubServicio(event.data['nombre'], event.data['descripcion']);
      }
    } else {
      // CANCELAR
      this.showAlertAddSubServicio = event.bool;
      this.lblTitleSubServicio = 'Agregar Sub-Servicio';
      this.showAlertTypeServicio = 'Agregar';
      this.objSubServicioEdit = null;
    }
  }

  reciveButton(event: ResponseEvent) {
    if (event.bool) {
      switch (event.data.type) {
        case 'editar':
          this.lblTitleServicio = 'Actualizar Servicio';
          this.objServicioEdit = this.dataServicios[event.data['index']];
          this.showAlertAddServicio = true;

          this.showAlertTypeServicio = 'Editar';
          break;

        case 'cuenta':
          this.labelCuenta = this.dataServicios[event.data['index']].nombre;
          this.idServicioSend = this.dataServicios[event.data['index']].id_servicio;
          this.showCardCuenta = true;
          break;
      }
      //console.log('index: ',event.data['index']);
    }
  }

  responseCuenta(event: boolean){
    this.showCardCuenta = false;
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
