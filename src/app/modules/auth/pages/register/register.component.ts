import { formatDate } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { initFlowbite } from 'flowbite';
import { ApiResult } from 'src/app/shared/interfaces/api/api.result';
import { Code } from 'src/app/shared/interfaces/app/code';
import { Contacto } from 'src/app/shared/interfaces/app/sesion-module/contacto';
import { Usuario } from 'src/app/shared/interfaces/app/sesion-module/usuario';
import { DataLocalStorage } from 'src/app/shared/interfaces/local/data-local-storage';
import { AuthService } from 'src/app/shared/services/sesion-module/auth/auth.service';
import { CodeService } from 'src/app/shared/services/code/code.service';
import { ContactoService } from 'src/app/shared/services/sesion-module/contacto/contacto.service';
import { UsuarioService } from 'src/app/shared/services/sesion-module/usuario/usuario.service';
import { arrayBanco, arrayCivil, arrayCodeCountries, arrayExp, arrayPreguntas, arrayRol, arraySexo } from 'src/app/shared/utils/local.array';
import { goLogin } from 'src/app/shared/utils/local.router';
import { deleteLocalStorageData, getLocalDataLogged } from 'src/app/shared/utils/local.storage';
import { inicialesCapital, letraCapital, returnPrimerSubString } from 'src/app/shared/utils/utils.utils';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  /** ---------------------------------- Variables de Inicio ---------------------------------- **/
  @Output() cancelEvent = new EventEmitter<boolean>();
  @Output() resultRegister = new EventEmitter<boolean>();

  @Input() title: string = '';

  // ================ INICIO ================ //
  // Data Local Storeage - Variable
  dataLocalStorage: DataLocalStorage = {
    usuario: null,
    loggedDate: ''
  }

  // Usuario logeado
  userLogeado!: Usuario;

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

  // ================  ================ //
  dataCode = arrayCodeCountries;
  dataExp = arrayExp;
  dataRol = arrayRol;
  dataCivil = arrayCivil;
  dataPregunta = arrayPreguntas;
  dataBanco = arrayBanco;
  dataSexo = arraySexo;

  formRegisterUsuario = new FormGroup({
    user: new FormControl('', []),

    codigo: new FormControl('', [Validators.required]),

    nombres: new FormControl('', [Validators.required]),
    apellidos: new FormControl('', [Validators.required]),
    code: new FormControl('+591', [Validators.required]),
    celular: new FormControl('', [Validators.required]),
    telefono: new FormControl('', []),
    ci: new FormControl('', [Validators.required]),
    exp: new FormControl('', [Validators.required]),
    sexo: new FormControl('', [Validators.required]),
    est_civil: new FormControl('', [Validators.required]),
    fec_nac: new FormControl('', [Validators.required]),

    banco: new FormControl('', [Validators.required]),
    nro_cuenta: new FormControl('', [Validators.required]),

    fec_ingreso: new FormControl('', [Validators.required]),
    fec_baja: new FormControl('', []),
    rol: new FormControl('', [Validators.required]),
    img: new FormControl('', []),

    user_mod: new FormControl('', []),
  });

  formRegisterAuth = new FormGroup({
    user: new FormControl('@ingenialab.com', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
    pregunta: new FormControl('', [Validators.required]),
    respuesta: new FormControl('', [Validators.required]),
  });

  formAddContacto = new FormGroup({
    nro_contacto: new FormControl('', [Validators.required]),
    nombre_contacto: new FormControl('', [Validators.required]),
  });

  arrayContactos: Contacto[] = [];

  hasCode: boolean = false;

  objCode!: Code;

  _CodeTypeRequired: string = 'Registro de Usuario';

  /** -------------------------------------- Constructor -------------------------------------- **/
  constructor(
    private router: Router,
    private usuarioService: UsuarioService,
    private authService: AuthService,
    private contactoService: ContactoService,
    private codeService: CodeService,
    private toast: HotToastService
  ) {
    this.formRegisterUsuario.controls.codigo.disable();
    this.formRegisterUsuario.controls.rol.disable();
    /*if (getLocalDataLogged() != null) {
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
    }*/
  }

  /** ---------------------------------------- OnInit ----------------------------------------- **/
  ngOnInit(): void {
    initFlowbite();
  }

  /** ---------------------------------------- Methods ---------------------------------------- **/
  limpiarFormRegister() {
    this.formRegisterUsuario.reset();
    this.formRegisterAuth.reset();
  }

  limpiarFormAddContacto() {
    this.formAddContacto.reset();
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

  generateCodigoEmpleado(): String {
    const nombre = returnPrimerSubString(String(this.formRegisterUsuario.controls.nombres.value));
    const iniNombre = inicialesCapital(nombre);

    const iniApellidos = inicialesCapital(String(this.formRegisterUsuario.controls.apellidos.value));

    const fecString = formatDate(String(this.formRegisterUsuario.controls.fec_nac.value), 'ddMMyy', 'es');

    return iniApellidos + iniNombre + fecString + '-' + this.objCode.var_number;
  }

  getNextNumAddContact(): number {

    if (this.arrayContactos.length === 0) { return 1; }

    const x = this.arrayContactos[this.arrayContactos.length - 1];

    return x.cont + 1;
  }

  reordenarNroContacto() {
    let aux: Contacto[] = [];

    for (let i = 0; i < this.arrayContactos.length; i++) {
      let obj = this.arrayContactos[i];
      obj.cont = i + 1;
      aux.push(obj);
    }

    this.arrayContactos = aux;
  }

  setUserArrayContacts(user: string) {
    for (let i = 0; i < this.arrayContactos.length; i++) {
      let obj = this.arrayContactos[i];
      obj.user = user;
    }
  }

  /** ------------------------------------ Methods onClick ------------------------------------ **/
  onClickAgregarUsuario() {
    if (this.formRegisterAuth.valid) {
      if (this.formRegisterUsuario.valid) {
        this.isLoading = true;
        this.agregarUsuario();
      } else {
        this.customErrorToast('Datos personales son requeridos.');
      }
    } else {
      this.customErrorToast('Datos de inicio de sesión son requeridos.');
    }
  }

  onClickCancelarAgregar() {
    this.cancelEvent.emit(true);
  }

  onClickAddContacto() {
    if (this.formAddContacto.valid) {

      const obj = {
        user: String(this.formRegisterAuth.controls.user.value).trim(),
        cont: this.getNextNumAddContact(),
        nro_contacto: String(this.formAddContacto.controls.nro_contacto.value),
        nombre_contacto: letraCapital(String(this.formAddContacto.controls.nombre_contacto.value).trim())
      }

      this.arrayContactos.push(obj);

      this.limpiarFormAddContacto();
    }
  }

  onClickRemoveContact(index: number) {
    this.arrayContactos.splice(index, 1);
    this.reordenarNroContacto();
  }

  /** ----------------------------------- Consultas Sevidor ----------------------------------- **/
  agregarUsuario() {
    this.formRegisterUsuario.controls.user.setValue(String(this.formRegisterAuth.controls.user.value));
    this.formRegisterUsuario.controls.user_mod.setValue(String(this.formRegisterAuth.controls.user.value));

    const dataUsuario = {
      user: String(this.formRegisterUsuario.controls.user.value),
      codigo: this.generateCodigoEmpleado(),
      nombres: letraCapital(String(this.formRegisterUsuario.controls.nombres.value).trim()),
      apellidos: letraCapital(String(this.formRegisterUsuario.controls.apellidos.value).trim()),
      code: String(this.formRegisterUsuario.controls.code.value),
      celular: String(this.formRegisterUsuario.controls.celular.value),
      telefono: String(this.formRegisterUsuario.controls.telefono.value),
      ci: String(this.formRegisterUsuario.controls.ci.value).trim(),
      exp: String(this.formRegisterUsuario.controls.exp.value),
      fec_ingreso: String(this.formRegisterUsuario.controls.fec_ingreso.value),
      fec_baja: String(this.formRegisterUsuario.controls.fec_baja.value),
      banco: String(this.formRegisterUsuario.controls.banco.value),
      nro_cuenta: String(this.formRegisterUsuario.controls.nro_cuenta.value).trim(),
      sexo: String(this.formRegisterUsuario.controls.sexo.value),
      est_civil: String(this.formRegisterUsuario.controls.est_civil.value),
      fec_nac: String(this.formRegisterUsuario.controls.fec_nac.value),
      rol: String(this.formRegisterUsuario.controls.rol.value),
      img: String(this.formRegisterUsuario.controls.img.value),
      user_mod: String(this.formRegisterUsuario.controls.user_mod.value),
    }

    this.usuarioService.usuarioRegistro(dataUsuario).subscribe(resultUsuario => {
      resultUsuario as ApiResult;

      if (resultUsuario.boolean) {
        this.agregarAuth(dataUsuario);
      } else {
        this.customErrorToast(resultUsuario.message);
        this.isLoading = false;
      }
    });
  }

  agregarAuth(dataUsuario: any) {
    const dataAuth = {
      user: String(this.formRegisterAuth.controls.user.value).trim(),
      password: String(this.formRegisterAuth.controls.password.value),
      pregunta: String(this.formRegisterAuth.controls.pregunta.value),
      respuesta: String(this.formRegisterAuth.controls.respuesta.value).trim(),
    }
    this.authService.authRegistro(dataAuth).subscribe(resultAuth => {
      resultAuth as ApiResult;

      if (resultAuth.boolean) {
        this.setUserArrayContacts(dataUsuario.user);

        if (this.arrayContactos.length > 0) {
          this.agregarContactos(dataUsuario);
        } else {
          if (this.objCode.count - 1 === 0) {
            this.deleteCode();
          } else {
            this.updateCode();
          }
        }
      } else {
        this.customErrorToast(resultAuth.message);
        this.isLoading = false;
      }
    });
  }

  agregarContactos(dataUsuario: any) {
    this.contactoService.contactoRegistro(dataUsuario.user, this.arrayContactos).subscribe(resultContacto => {
      resultContacto as ApiResult;

      if (resultContacto.boolean) {
        this.limpiarFormRegister();
        if (this.objCode.count - 1 === 0) {
          this.deleteCode();
        } else {
          this.updateCode();
        }
      } else {
        this.customErrorToast(resultContacto.message);
        this.isLoading = false;
      }
    });
  }

  deleteCode() {
    this.codeService.deleteCode(this.objCode.id).subscribe(resultCode => {
      resultCode as ApiResult;

      if (resultCode.boolean) {
        this.customSuccessToast('Se ha registrado correctamente.');
        this.cancelEvent.emit(true);
      } else {
        this.customErrorToast(resultCode.message);
        this.isLoading = false;
      }
    });
  }

  updateCode() {
    this.objCode.count = this.objCode.count - 1;
    this.codeService.updateCode(this.objCode.id, this.objCode).subscribe(resultCode => {
      resultCode as ApiResult;

      if (resultCode.boolean) {
        this.customSuccessToast('Se ha registrado correctamente.');
        this.cancelEvent.emit(true);
      } else {
        this.customErrorToast(resultCode.message);
        this.isLoading = false;
      }
    });
  }

  /** ---------------------------------- Onclick file import ---------------------------------- **/

  /** ---------------------------------------- Receiver --------------------------------------- **/
  codeReceiver(data: ApiResult | null) {
    if (data !== null) {
      this.objCode = data.data[0] as Code

      if (this.objCode.type === this._CodeTypeRequired) {
        this.hasCode = true;
        this.customSuccessToast('Código de verificación correcto.');
        this.formRegisterUsuario.controls.codigo.setValue(String(this.objCode.var_number));
        this.formRegisterUsuario.controls.rol.setValue(this.objCode.var_string);

        const x = String(this.generateCodigoEmpleado());
        this.customSuccessToast(x);
      } else {
        this.customErrorToast('El código no es para este uso.')
      }
    } else {
      this.cancelEvent.emit(true);
    }
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
