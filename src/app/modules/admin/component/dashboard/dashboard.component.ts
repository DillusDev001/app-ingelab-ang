import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { initFlowbite } from 'flowbite';
import { Usuario } from 'src/app/shared/interfaces/app/usuario';
import { DataLocalStorage } from 'src/app/shared/interfaces/local/data-local-storage';
import { goAdminCotizacionLaboratorio, goAdminGraficosGeneral, goAdminHome, goIndex, goLogin, goUsuarios } from 'src/app/shared/utils/local.router';
import { deleteLocalStorageData, getLocalDataLogged, localStorageLogOut } from 'src/app/shared/utils/local.storage';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
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
  // SideBar
  open: boolean = false;

  menuSelected: string = 'Inicio';
  subMenuSelected: string = '';

  title: string = this.menuSelected;


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
  onClickSideBar(sw: boolean) {
    this.open = sw;
  }

  onClickSetMenuSelected(event: string) {
    this.menuSelected = event;
    this.subMenuSelected = '';
    this.title = event;

    switch (event) {
      case 'Inicio':
        goAdminHome(this.router);
        break;

      case '':
        break;
    }

    this.open = false;
  }

  onClickSetSubMenuSelected(m: string, sm: string) {
    this.subMenuSelected = sm;
    this.menuSelected = m;

    this.title = sm;

    switch (sm) {
      // Inicio
      case 'Cotización': goAdminCotizacionLaboratorio(this.router); break;

      case 'Recepción': break;

      case 'Pruebas': break;

      case 'Gráficos': goAdminGraficosGeneral(this.router); break;

      // Mantenimiento
      case 'Parámetro': break;

      case 'Clientes': break;

      case 'Usuarios': goUsuarios(this.router); break;
    }

    this.open = false;
  }

  onClickLogOut() {
    if (localStorageLogOut()) {
      goIndex(this.router);
    }
  }

  /** ----------------------------------- Consultas Sevidor ----------------------------------- **/

  /** ---------------------------------- Onclick file import ---------------------------------- **/

  /** ---------------------------------------- Receiver --------------------------------------- **/

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
