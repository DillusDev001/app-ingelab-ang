import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { initFlowbite } from 'flowbite';
import { ApiResult } from 'src/app/shared/interfaces/api/api.result';
import { Proovedor } from 'src/app/shared/interfaces/app/gastos-module/proovedor';
import { Usuario } from 'src/app/shared/interfaces/app/sesion-module/usuario';
import { DataLocalStorage } from 'src/app/shared/interfaces/local/data-local-storage';
import { ProovedorService } from 'src/app/shared/services/gasto-module/proveedor/proovedor.service';
import { arrayBanco, arrayMoneda } from 'src/app/shared/utils/local.array';
import { goLogin } from 'src/app/shared/utils/local.router';
import { deleteLocalStorageData, getLocalDataLogged } from 'src/app/shared/utils/local.storage';

@Component({
  selector: 'app-lista-proveedores',
  templateUrl: './lista-proveedores.component.html',
  styleUrls: ['./lista-proveedores.component.css']
})
export class ListaProveedoresComponent implements OnInit {
  /** -------------------------------------- Constructor -------------------------------------- **/
  constructor(
    private router: Router,
    private toast: HotToastService,
    private proovedorService: ProovedorService
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

    this.getListaProveedor();
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
  formProovedor = new FormGroup({
    razon: new FormControl('', [Validators.required]),
    nit: new FormControl('', [Validators.required]),
    banco: new FormControl('', [Validators.required]),
    nro_cuenta: new FormControl('', [Validators.required]),
    beneficiario: new FormControl('', [Validators.required]),
    moneda: new FormControl('', [Validators.required])
  });

  // Title String
  titleLabel: string = 'Agregar Proveedor';

  // Button label
  btnLabel: string = 'Agregar';

  // paginacion
  paginationArray: number[] = [];
  posPaginacion!: number;

  dataProovedores: Proovedor[] = [];

  proovedorEdit!: Proovedor;

  // al editar
  isEditing: boolean = false;

  dataBanco = arrayBanco;
  dataMoneda = arrayMoneda;

  /** ---------------------------------------- Methods ---------------------------------------- **/
  showListaNext(n: number) {
    this.posPaginacion = n;

    let cant = n * 10;
    let ini = cant - 10;
    let fin = 0;
    if ((ini + 9) <= this.dataProovedores.length - 1) {
      fin = ini + 9;
    } else {
      fin = this.dataProovedores.length - 1;
    }

    this.dataProovedores = [];
    while (ini <= fin) {
      this.dataProovedores.push(this.dataProovedores[ini]);
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
    this.formProovedor.controls.razon.setValue('');
    this.formProovedor.controls.nit.setValue('');
    this.formProovedor.controls.banco.setValue('');
    this.formProovedor.controls.nro_cuenta.setValue('');
    this.formProovedor.controls.beneficiario.setValue('');
    this.formProovedor.controls.moneda.setValue('');
  }

  labelSetEdit() {
    this.titleLabel = 'Actualizar Proveedor';
    this.btnLabel = 'Guardar';
    this.isEditing = true;
  }

  labelSetAgregar() {
    this.titleLabel = 'Agregar Proveedor';
    this.btnLabel = 'Agregar';
    this.isEditing = false;
    this.limpiarFormParametro();
  }

  /** ------------------------------------ Methods onClick ------------------------------------ **/
  onClickGuardar() {
    if (this.formProovedor.valid) {
      this.isLoading = true;
      if (this.btnLabel === 'Agregar') {
        this.agregarProovedor();
      } else if (this.btnLabel === 'Guardar') {
        this.editarParametro();
      }
    }
  }

  onClickCancelar() {
    this.labelSetAgregar();
  }

  onClickEditar(index: number) {
    this.proovedorEdit = this.dataProovedores[index];

    this.formProovedor.controls.razon.setValue(this.proovedorEdit.razon);
    this.formProovedor.controls.nit.setValue(this.proovedorEdit.nit);
    this.formProovedor.controls.banco.setValue(this.proovedorEdit.banco);
    this.formProovedor.controls.nro_cuenta.setValue(this.proovedorEdit.nro_cuenta);
    this.formProovedor.controls.beneficiario.setValue(this.proovedorEdit.beneficiario);
    this.formProovedor.controls.moneda.setValue(this.proovedorEdit.moneda);

    this.labelSetEdit();
  }

  /** ----------------------------------- Consultas Sevidor ----------------------------------- **/
  agregarProovedor() {
    const data = {
      razon: String(this.formProovedor.controls.razon.value),
      nit: String(this.formProovedor.controls.nit.value),
      banco: String(this.formProovedor.controls.banco.value),
      nro_cuenta: String(this.formProovedor.controls.nro_cuenta.value),
      beneficiario: String(this.formProovedor.controls.beneficiario.value),
      moneda: String(this.formProovedor.controls.moneda.value),
      user_crea: this.userLogeado.user,
      user_mod: this.userLogeado.user,
    };

    this.proovedorService.proovedorRegistro(data).subscribe(result => {
      result as ApiResult;

      if (result.boolean) {
        this.customSuccessToast(result.message);
        this.getListaProveedor();
        this.labelSetAgregar();
      } else {
        this.customErrorToast(result.message);
      }
    });
  }

  editarParametro() {
    const data = {
      razon: String(this.formProovedor.controls.razon.value),
      nit: String(this.formProovedor.controls.nit.value),
      banco: String(this.formProovedor.controls.banco.value),
      nro_cuenta: String(this.formProovedor.controls.nro_cuenta.value),
      beneficiario: String(this.formProovedor.controls.beneficiario.value),
      moneda: String(this.formProovedor.controls.moneda.value),
      user_mod: this.userLogeado.user,
    };

    this.proovedorService.proovedorActualizar(this.proovedorEdit.id_proveedor, data).subscribe(result => {
      result as ApiResult;

      if (result.boolean) {
        this.customSuccessToast(result.message);
        this.getListaProveedor();
        this.labelSetAgregar();
      } else {
        this.customErrorToast(result.message);
      }
    });
  }

  getListaProveedor() {
    this.proovedorService.proovedorGetLista().subscribe(result => {
      result as ApiResult;

      if (result.boolean) {
        this.dataProovedores = result.data as Proovedor[];

        /*let nPaginacion = Math.trunc(this.dataProovedores.length / 10) + 1;
        this.paginationArray = Array.from({ length: nPaginacion }, (_, i) => i + 1);*/
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
