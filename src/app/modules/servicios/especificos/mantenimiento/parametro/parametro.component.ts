import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { initFlowbite } from 'flowbite';
import { ApiResult } from 'src/app/shared/interfaces/api/api.result';
import { Parametro } from 'src/app/shared/interfaces/app/frx-module/parametro';
import { Usuario } from 'src/app/shared/interfaces/app/sesion-module/usuario';
import { DataLocalStorage } from 'src/app/shared/interfaces/local/data-local-storage';
import { ParametroFrxService } from 'src/app/shared/services/frx-module/parametro-frx/parametro-frx.service';
import { goLogin } from 'src/app/shared/utils/local.router';
import { deleteLocalStorageData, getLocalDataLogged } from 'src/app/shared/utils/local.storage';

@Component({
  selector: 'app-parametro',
  templateUrl: './parametro.component.html',
  styleUrls: ['./parametro.component.css']
})
export class ParametroComponent implements OnInit {
  /** -------------------------------------- Constructor -------------------------------------- **/
  constructor(
    private router: Router,
    private parametroFrxService: ParametroFrxService,
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

    this.getParametros();
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

  result!: ApiResult;

  // ================  ================ //
  formParametro = new FormGroup({
    id: new FormControl(0),
    nombre: new FormControl('', [Validators.required]),
    costo_directo: new FormControl('0', [Validators.required]),
    costo_variable: new FormControl('0', [Validators.required])
  });

  // Title String
  titleLabel: string = 'Agregar Parámetro';

  // Button label
  btnLabel: string = 'Agregar';

  // paginacion
  paginationArray: number[] = [];
  posPaginacion!: number;

  dataParametros: Parametro[] = [];

  parametroEdit!: Parametro;

  // al editar
  isEditing: boolean = false;

  /** ---------------------------------------- Methods ---------------------------------------- **/
  showListaNext(n: number) {
    this.posPaginacion = n;

    let cant = n * 10;
    let ini = cant - 10;
    let fin = 0;
    if ((ini + 9) <= this.dataParametros.length - 1) {
      fin = ini + 9;
    } else {
      fin = this.dataParametros.length - 1;
    }

    this.dataParametros = [];
    while (ini <= fin) {
      this.dataParametros.push(this.dataParametros[ini]);
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

  limpiarFormParametro() {
    this.formParametro.controls.id.setValue(0);
    this.formParametro.controls.nombre.setValue('');
    this.formParametro.controls.costo_directo.setValue('');
    this.formParametro.controls.costo_variable.setValue('');
  }

  labelSetEdit() {
    this.titleLabel = 'Actualizar Parámetro';
    this.btnLabel = 'Guardar';
    this.isEditing = true;
  }

  labelSetAgregar() {
    this.titleLabel = 'Agregar Parámetro';
    this.btnLabel = 'Agregar';
    this.isEditing = false;
    this.limpiarFormParametro();
  }
  /** ------------------------------------ Methods onClick ------------------------------------ **/
  onClickEditar(index: number) {
    this.parametroEdit = this.dataParametros[index];

    this.formParametro.controls.id.setValue(this.parametroEdit.id_parametro);
    this.formParametro.controls.nombre.setValue(this.parametroEdit.nombre);
    this.formParametro.controls.costo_directo.setValue(String(this.parametroEdit.costo_directo));
    this.formParametro.controls.costo_variable.setValue(String(this.parametroEdit.costo_variable));

    this.labelSetEdit();
  }

  onClickRemove(index: number) {
    this.customErrorToast('No disponible!!!');
  }

  onClickGuardar() {
    if (this.formParametro.valid) {
      if (this.btnLabel === 'Agregar') {
        this.agregarParametro();
      } else if (this.btnLabel === 'Guardar') {
        this.editarParametro();
      }
    }
  }
  onClickCancelar() {
    this.labelSetAgregar();
  }

  /** ----------------------------------- Consultas Sevidor ----------------------------------- **/
  getParametros() {
    this.parametroFrxService.parametroGetLista().subscribe(result => {
      result as ApiResult;

      if (result.rows > 0) {
        this.dataParametros = result.data;

        // Paginación
        let nPaginacion = Math.trunc(this.dataParametros.length / 10) + 1;
        this.paginationArray = Array.from({ length: nPaginacion }, (_, i) => i + 1);
      }

      this.isLoading = false;
    });
  }

  agregarParametro() {
    const data = {
      nombre: String(this.formParametro.controls.nombre.value),
      costo_directo: Number(this.formParametro.controls.costo_directo.value),
      costo_variable: Number(this.formParametro.controls.costo_variable.value),
      user_crea: this.userLogeado.user,
      user_mod: this.userLogeado.user,
    }

    this.parametroFrxService.parametroRegistro(data).subscribe(result => {
      result as ApiResult;

      if (result.boolean) {
        this.getParametros();
        this.labelSetAgregar();
      } else {
        this.customErrorToast(result.message);
      }
    })
  }

  editarParametro() {
    const data = {
      id_parametro: Number(this.formParametro.controls.id.value),
      nombre: String(this.formParametro.controls.nombre.value),
      costo_directo: Number(this.formParametro.controls.costo_directo.value),
      costo_variable: Number(this.formParametro.controls.costo_variable.value),
      user_mod: this.userLogeado.user,
    }

    this.parametroFrxService.parametroActualizar(data.id_parametro, data).subscribe(result => {
      result as ApiResult;

      if (result.boolean) {
        this.getParametros();
        this.labelSetAgregar();
      } else {
        this.customErrorToast(result.message);
      }
    })
  }

  /** ---------------------------------- Onclick file import ---------------------------------- **/

  /** ---------------------------------------- Receiver --------------------------------------- **/
  /*reciveCustomInput(event: EventResponse) {
    if (event.bool) {
      console.log(String(event.val));
      this.showAlertCustomInput = false;
    } else {
      this.showAlertCustomInput = event.bool;
    }
  }*/

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
