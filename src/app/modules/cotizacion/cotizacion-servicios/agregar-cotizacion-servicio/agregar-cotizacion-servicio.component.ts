import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { initFlowbite } from 'flowbite';
import { ApiResult } from 'src/app/shared/interfaces/api/api.result';
import { Empresa } from 'src/app/shared/interfaces/app/empresa';
import { Persona } from 'src/app/shared/interfaces/app/persona';
import { Usuario } from 'src/app/shared/interfaces/app/usuario';
import { DataLocalStorage } from 'src/app/shared/interfaces/local/data-local-storage';
import { goLogin } from 'src/app/shared/utils/local.router';
import { deleteLocalStorageData, getLocalDataLogged } from 'src/app/shared/utils/local.storage';

@Component({
  selector: 'app-agregar-cotizacion-servicio',
  templateUrl: './agregar-cotizacion-servicio.component.html',
  styleUrls: ['./agregar-cotizacion-servicio.component.css']
})
export class AgregarCotizacionServicioComponent implements OnInit {
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
  formCotizacion = new FormGroup({
    email: new FormControl('diego', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
    cod_cotizacion: new FormControl(this.generarCodCotizacion() || null, [Validators.required]),
    observacion: new FormControl('', [Validators.required]),
  })

  fechaNow: string = formatDate(new Date(), 'dd/MM/yyyy', 'es');

  personaC: Persona = {
    id: null,
    nombre_completo: 'Jhamir Jimenez',
    celular: '+591 XXX XXXXX',
    email: 'example@email.com',
    razon: 'Empresa',
    nit: '123123123',
    id_empresa: 0
  }

  empresaC: Empresa = {
    id_empresa: 0,
    razon: 'Empresa',
    nit: '123123123',
    direccion: 'Av. Principal',
    telefono: '+591 2 XXXXXXX',
    web: 'www.empresa.com',
    ciudad: 'La Paz',
    pais: 'Bolivia'
  }

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
  generarCodCotizacion() {
    return 'COD-SER-'+ formatDate(new Date(), 'ddMMYY', 'es') + '-001-INGLAB';
  }

  /** ------------------------------------ Methods onClick ------------------------------------ **/

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
