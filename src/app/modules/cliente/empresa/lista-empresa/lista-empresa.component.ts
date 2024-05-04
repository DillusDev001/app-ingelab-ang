import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { initFlowbite } from 'flowbite';
import { ApiResult } from 'src/app/shared/interfaces/api/api.result';
import { Empresa } from 'src/app/shared/interfaces/app/cliente-module/empresa';
import { Usuario } from 'src/app/shared/interfaces/app/sesion-module/usuario';
import { DataLocalStorage } from 'src/app/shared/interfaces/local/data-local-storage';
import { EmpresaService } from 'src/app/shared/services/cliente/empresa/empresa.service';
import { goAdminMantenimientoClienteAgregar, goLogin } from 'src/app/shared/utils/local.router';
import { deleteLocalStorageData, getLocalDataLogged } from 'src/app/shared/utils/local.storage';

@Component({
  selector: 'app-lista-empresa',
  templateUrl: './lista-empresa.component.html',
  styleUrls: ['./lista-empresa.component.css']
})
export class ListaEmpresaComponent implements OnInit  {
  /** -------------------------------------- Constructor -------------------------------------- **/
  constructor(
    private router: Router,
    private toast: HotToastService,
    private empresaService: EmpresaService
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

    this.getListaEmpresas();
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
  dataEmpresa: Empresa[] = [];

  /** ---------------------------------------- Methods ---------------------------------------- **/

  /** ------------------------------------ Methods onClick ------------------------------------ **/
  
  /** ----------------------------------- Consultas Sevidor ----------------------------------- **/
  getListaEmpresas() {
    this.empresaService.empresaGetAll().subscribe(result => {
      result as ApiResult;

      if (result.boolean) {
        this.dataEmpresa = result.data as Empresa[];
        //this.isLoading = false;
      } else {
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
