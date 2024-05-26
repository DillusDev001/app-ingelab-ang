import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { initFlowbite } from 'flowbite';
import { ApiResult } from 'src/app/shared/interfaces/api/api.result';
import { Usuario } from 'src/app/shared/interfaces/app/sesion-module/usuario';
import { DataLocalStorage } from 'src/app/shared/interfaces/local/data-local-storage';
import { goAdminServiciosEspecificosAgregar, goAdminServiciosEspecificosListaFRX, goLogin } from 'src/app/shared/utils/local.router';
import { deleteLocalStorageData, getLocalDataLogged } from 'src/app/shared/utils/local.storage';
import { admiRecepcionFRXLista } from 'src/app/shared/utils/routers/recepcion.route';

@Component({
  selector: 'app-index-especificos',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent {
  /** ---------------------------------- Variables de Inicio ---------------------------------- **/
  // ================ INICIO ================ //
  // Data Local Storeage - Variable
  dataLocalStorage: DataLocalStorage = {
    usuario: null,
    loggedDate: ''
  }

  // Usuario logeado
  userLogeado!: Usuario;

  result!: ApiResult;

  // ================  ================ //
  formLogin = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  });

  selectedTab: string = 'Lista FRX';


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

  /** ------------------------------------ Methods onClick ------------------------------------ **/
  onClickButton(value: string) {
    switch (value) {
      case 'MantenimientoFRX':
        //goAdminServiciosEspecificosMantenimiento(this.router);
        this.selectedTab = value;
        break;

      case 'Lista FRX':
        goAdminServiciosEspecificosListaFRX(this.router);
        this.selectedTab = value;
        break;

      case 'Recepción FRX':
        admiRecepcionFRXLista(this.router);
        this.selectedTab = value;
        break;

      case 'Agregar': goAdminServiciosEspecificosAgregar(this.router); break;
    }
  }

  /** ----------------------------------- Consultas Sevidor ----------------------------------- **/

  /** ---------------------------------- Onclick file import ---------------------------------- **/

  /** ---------------------------------------- Receiver --------------------------------------- **/

  /** --------------------------------------- ShowAlerts -------------------------------------- **/
}
