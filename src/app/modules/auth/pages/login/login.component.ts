import { formatDate } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiResult } from 'src/app/shared/interfaces/api/api.result';
import { Usuario } from 'src/app/shared/interfaces/app/sesion-module/usuario';
import { DataLocalStorage } from 'src/app/shared/interfaces/local/data-local-storage';
import { AuthService } from 'src/app/shared/services/sesion-module/auth/auth.service';
import { goAdminHome, goForGotPassword } from 'src/app/shared/utils/local.router';
import { setLocalDataLogged } from 'src/app/shared/utils/local.storage';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  /** ---------------------------------- Variables de Inicio ---------------------------------- **/
  @Output() registerEvent = new EventEmitter<string>();
  // ================ INICIO ================ //
  dataLocalStorage: DataLocalStorage = {
    usuario: null,
    loggedDate: ''
  };

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


  formLogin = new FormGroup({
    email: new FormControl('admin-dillus@ingenialab.com', [Validators.required, Validators.email]),
    password: new FormControl('Mudanzas*123', [Validators.required])
  })


  /** -------------------------------------- Constructor -------------------------------------- **/
  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  /** ---------------------------------------- OnInit ----------------------------------------- **/
  ngOnInit(): void { }

  /** ---------------------------------------- Methods ---------------------------------------- **/
  saveLoggedData() {
    const user = this.result.data[0] as Usuario;

    if (user != null) {
      this.dataLocalStorage.usuario = user;
      this.dataLocalStorage.loggedDate = formatDate(Date.now(), 'dd/MM/y, h:mm a', 'es');
      setLocalDataLogged(this.dataLocalStorage);
      this.goNext();
    }

  }

  goNext() {
    if (this.result.rows > 0) {
      const user = this.result.data[0] as Usuario;
      switch (user.rol) {
        case 'Developer':
          goAdminHome(this.router);
          break;

        case 'Administrador':
          goAdminHome(this.router);
          break;

        case 'Asistente':
          break;

        case 'Laboratorio':
          break;
      }
      //let boliviaTime = new Date(user.fec_crea).toLocaleString("en-US", { timeZone: "America/Aruba" });
    }
  }

  /** ------------------------------------ Methods onClick ------------------------------------ **/
  onClickLogin() {
    if (this.formLogin.valid) {
      this.isLoading = true;
      const user = String(this.formLogin.controls.email.value);
      const pass = String(this.formLogin.controls.password.value);

      this.authService.authLogin(user, pass).subscribe(data => {
        this.result = data;
        this.isLoading = false;

        this.msgAlert = this.result.message;
        if (this.result.boolean) {
          this.saveLoggedData();
        } else {
          this.onShowError(true);
        }
      });

    }
  }

  onClickRegister() {
    this.registerEvent.emit('register');
  }

  onClickGoForGotPasswrd() {
    goForGotPassword(this.router);
  }

  /** ----------------------------------- Consultas Sevidor ----------------------------------- **/

  /** ---------------------------------- Onclick file import ---------------------------------- **/

  /** ---------------------------------------- Receiver --------------------------------------- **/
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
}
