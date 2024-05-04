import { Component, OnInit, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { initFlowbite } from 'flowbite';
import { Usuario } from 'src/app/shared/interfaces/app/sesion-module/usuario';
import { DataLocalStorage } from 'src/app/shared/interfaces/local/data-local-storage';
import { goAdminCotizacionLaboratorio, goAdminGraficosGeneral, goAdminHome, goAdminMantenimientoCliente, goAdminMantenimientoClienteAgregar, goAdminMantenimientoEmpresa, goAdminServiciosEspecificosListaFRX, goAdminServiciosEspecificosMantenimientoParametro, goAdminServiciosGeneralesLista, goIndex, goLogin, goUsuarios } from 'src/app/shared/utils/local.router';
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

  booleanServicios: boolean = false;
  booleanMantenimieto: boolean = false;


  /** -------------------------------------- Constructor -------------------------------------- **/
  constructor(
    private router: Router,
    private renderer: Renderer2
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

  onClickSetMenuSelected(eventTitle: string, div: any) {
    switch (eventTitle) {
      case 'Inicio':
        this.title = eventTitle;

        this.menuSelected = eventTitle;
        this.subMenuSelected = '';

        goAdminHome(this.router);
        this.open = false;
        break;

      case 'Gráficos':
        this.title = eventTitle;

        this.menuSelected = eventTitle;
        this.subMenuSelected = '';

        goAdminGraficosGeneral(this.router);
        this.open = false;
        break;

      case 'Servicios':
        // this.onClickSetSubMenuSelected(eventTitle, 'Específicos');
        this.booleanServicios = !this.booleanServicios;

        if (this.booleanServicios) {
          this.renderer.setAttribute(div, 'class', 'flex flex-col ml-12 h-max');
        } else {
          this.renderer.setAttribute(div, 'class', 'flex flex-col ml-12 overflow-hidden h-0');
        }
        break;

      case 'Mantenimiento':
        // this.onClickSetSubMenuSelected(eventTitle, 'Parámetro');
        this.booleanMantenimieto = !this.booleanMantenimieto;

        if (this.booleanMantenimieto) {
          this.renderer.setAttribute(div, 'class', 'flex flex-col ml-12 h-max');
        } else {
          this.renderer.setAttribute(div, 'class', 'flex flex-col ml-12 overflow-hidden h-0');
        }
        break;
    }
  }

  onClickSetSubMenuSelected(m: string, sm: string) {
    this.menuSelected = m;
    this.subMenuSelected = sm;

    this.title = m + ' ' + sm;

    switch (sm) {
      // Servicios
      case 'Generales': goAdminServiciosGeneralesLista(this.router); break;
      case 'Específicos': goAdminServiciosEspecificosListaFRX(this.router); break;

      // 
      case 'Cotización': goAdminCotizacionLaboratorio(this.router); break;

      case 'Recepción': break;

      case 'Pruebas': break;

      // Mantenimiento
      case 'Parámetro': goAdminServiciosEspecificosMantenimientoParametro(this.router); break;

      case 'Agregar Cliente': goAdminMantenimientoClienteAgregar(this.router); break;
      case 'Clientes': goAdminMantenimientoCliente(this.router); break;
      case 'Empresas': goAdminMantenimientoEmpresa(this.router); break;

      case 'Usuarios': goUsuarios(this.router); break;

      case 'Servicios Específicos': goUsuarios(this.router); break;

      case 'Servicios Generales': goUsuarios(this.router); break;
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
