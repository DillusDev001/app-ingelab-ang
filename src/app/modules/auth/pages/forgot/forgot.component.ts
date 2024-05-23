import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiResult } from 'src/app/shared/interfaces/api/api.result';
import { AuthService } from 'src/app/shared/services/sesion-module/auth/auth.service';
import { arrayPreguntas } from 'src/app/shared/utils/local.array';
import { goLogin } from 'src/app/shared/utils/local.router';

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.css']
})
export class ForgotComponent implements OnInit {
  /** ---------------------------------- Variables de Inicio ---------------------------------- **/
  // ================ INICIO ================ //
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
  formForgot = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    pregunta: new FormControl('', [Validators.required]),
    respuesta: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  })

  // Array de preguntas de seguridad
  dataPregunta = arrayPreguntas;

  // Api Result - respuesta de Servidor
  result!: ApiResult;

  /** -------------------------------------- Constructor -------------------------------------- **/
  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  /** ---------------------------------------- OnInit ----------------------------------------- **/
  ngOnInit(): void { }

  /** ---------------------------------------- Methods ---------------------------------------- **/
  limpiarFormForgot(){
    this.formForgot.controls.email.setValue('');
    this.formForgot.controls.pregunta.setValue('');
    this.formForgot.controls.respuesta.setValue('');
    this.formForgot.controls.password.setValue('');
    this.formForgot.markAsUntouched();
  }

  /** ------------------------------------ Methods onClick ------------------------------------ **/
  onClickValidar() {
    if (this.formForgot.valid) {
      this.isLoading = true;
      const user = String(this.formForgot.controls.email.value);
      const pregunta = String(this.formForgot.controls.pregunta.value);
      const respuesta = String(this.formForgot.controls.respuesta.value);
      const password = String(this.formForgot.controls.password.value);

      let data = { 
        pregunta, 
        respuesta, 
        password 
      }

      this.authService.authForGotPassword(user, data).subscribe(data => {
        console.log(data);
        this.result = data
        this.msgAlert = this.result.message;

        if(this.result.boolean){
          this.onShowInfo();
          this.limpiarFormForgot();
        } else {
          this.onShowError(true);
        }
      })
    }
  }

  onClickLogin(){
    goLogin(this.router);
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
      goLogin(this.router);
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
