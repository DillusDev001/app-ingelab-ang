import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { initFlowbite } from 'flowbite';
import { ApiResult } from 'src/app/shared/interfaces/api/api.result';
import { Usuario } from 'src/app/shared/interfaces/app/usuario';
import { DataLocalStorage } from 'src/app/shared/interfaces/local/data-local-storage';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { arrayCodeCountries, arrayExp, arrayPreguntas, arrayRol } from 'src/app/shared/utils/local.array';
import { goLogin } from 'src/app/shared/utils/local.router';
import { deleteLocalStorageData, getLocalDataLogged } from 'src/app/shared/utils/local.storage';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  /** ---------------------------------- Variables de Inicio ---------------------------------- **/
  @Output() cancelEvent = new EventEmitter<boolean>();
  @Output() resultRegister = new EventEmitter<boolean>();

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
  dataCode = arrayCodeCountries;
  dataExp = arrayExp;
  dataRol = arrayRol;
  dataPregunta = arrayPreguntas;

  formRegister = new FormGroup({
    user: new FormControl('', [Validators.required, Validators.email]),
    nombres: new FormControl('', [Validators.required]),
    apellidos: new FormControl('', [Validators.required]),
    code: new FormControl('+591', [Validators.required]),
    celular: new FormControl('', [Validators.required]),
    ci: new FormControl('', [Validators.required]),
    exp: new FormControl('', [Validators.required]),
    rol: new FormControl('', [Validators.required]),
    autorizacion: new FormControl(-1, []),
    img: new FormControl('', []),
    user_mod: new FormControl('', []),
    password: new FormControl('', []),
    pregunta: new FormControl('', [Validators.required]),
    respuesta: new FormControl('', [Validators.required]),
  });

  /** -------------------------------------- Constructor -------------------------------------- **/
  constructor(
    private router: Router,
    private authService: AuthService,
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
  }

  /** ---------------------------------------- Methods ---------------------------------------- **/
  limpiarFormRegister() {
    this.formRegister.reset();
  }
  getAutorizacion(rol: string) {
    let autorizacion = 0;

    for (let i = 0; i < this.dataRol.length; i++) {
      const val = this.dataRol[i];

      if (val.data == rol) {
        autorizacion = val.autorizacion;
        break
      }
    }

    return autorizacion;
  }

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

  /** ------------------------------------ Methods onClick ------------------------------------ **/
  onClickAgregarUsuario() {
    if (this.formRegister.valid) {
      this.customLoadingToast('Agregando');
      this.formRegister.controls.user_mod.setValue(String(this.userLogeado.user));
      this.formRegister.controls.password.setValue(String(this.formRegister.controls.ci.value));
      this.formRegister.controls.autorizacion.setValue(Number(this.getAutorizacion(String(this.formRegister.controls.rol.value))));

      this.authService.authRegister(this.formRegister.value).subscribe(data => {
        this.toast.close();
        this.result = data;
        if (this.result.boolean) {
          this.limpiarFormRegister();
          this.resultRegister.emit(true);
          this.customSuccessToast(this.result.message);
        } else {
          //this.resultRegister.emit(false);
          this.customErrorToast(this.result.message);
        }
      })
      console.log(this.formRegister.value);
    }
  }

  onClickCancelarAgregar() {
    this.cancelEvent.emit(true);
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
