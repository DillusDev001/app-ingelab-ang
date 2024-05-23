import { HttpEventType } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { initFlowbite } from 'flowbite';
import { ApiResult } from 'src/app/shared/interfaces/api/api.result';
import { Cuenta } from 'src/app/shared/interfaces/app/servicio-module/cuenta';
import { Usuario } from 'src/app/shared/interfaces/app/sesion-module/usuario';
import { DataLocalStorage } from 'src/app/shared/interfaces/local/data-local-storage';
import { CuentaService } from 'src/app/shared/services/servicio-module/cuenta/cuenta.service';
import { arrayBanco } from 'src/app/shared/utils/local.array';
import { goLogin } from 'src/app/shared/utils/local.router';
import { deleteLocalStorageData, getLocalDataLogged } from 'src/app/shared/utils/local.storage';
import { urlBaseApi } from 'src/app/shared/utils/local.string';


@Component({
  selector: 'app-custom-card-cuenta',
  templateUrl: './custom-card-cuenta.component.html',
  styleUrls: ['./custom-card-cuenta.component.css']
})
export class CustomCardCuentaComponent implements OnInit {
  /** -------------------------------------- Constructor -------------------------------------- **/
  constructor(
    private router: Router,
    private toast: HotToastService,
    private sanitizer: DomSanitizer,
    private cuentaService: CuentaService
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

    this.getCuenta(this.id_servicio);
  }

  /** ---------------------------------- Variables de Inicio ---------------------------------- **/
  @Input() label!: string;
  @Input() id_servicio!: number;
  @Output() response: EventEmitter<boolean> = new EventEmitter();

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
  formCuenta = new FormGroup({
    banco: new FormControl('', [Validators.required]),
    nro_cuenta: new FormControl('', [Validators.required]),
    a_nombre: new FormControl('', [Validators.required]),
    img: new FormControl('', [Validators.required])
  });

  objCuenta: Cuenta = {
    id_cuenta: 0,
    id_servicio: 0,
    banco: '',
    nro_cuenta: '',
    a_nombre: '',
    img: '',
    fec_crea: '',
    user_crea: '',
    fec_mod: '',
    user_mod: ''
  };;

  dataBanco = arrayBanco;

  archivoSelected: any;

  previsualizar!: string;

  typeView: string = 'ver';

  fileName: string = '';

  showLoadingImage = true;

  /** ---------------------------------------- Methods ---------------------------------------- **/
  imagenBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        resolve(reader.result as string);
      };
      reader.onerror = () => {
        reject('Error al leer el archivo');
      };
      reader.readAsDataURL(file);
    });
  }

  camposEnable() {
    this.formCuenta.controls.banco.enable();
    this.formCuenta.controls.nro_cuenta.enable();
    this.formCuenta.controls.a_nombre.enable();
  }

  camposDisable() {
    this.formCuenta.controls.banco.disable();
    this.formCuenta.controls.nro_cuenta.disable();
    this.formCuenta.controls.a_nombre.disable();
  }

  onImageLoad(): void {
    this.showLoadingImage = false; // Oculta la imagen de carga
  }

  /** ------------------------------------ Methods onClick ------------------------------------ **/
  onClickAgregarCuenta() {
    if (this.formCuenta.valid) {
      this.isLoading = true;
      if (this.typeView === 'agregar') {
        this.agregarCuenta();
      } else if (this.typeView === 'actualizar') {
        this.actualizarCuenta();
      }
    }
  }

  onClickCancel() {
    this.response.emit(false);
  }

  onClickActualizar() {
    this.typeView = 'actualizar';
    this.camposEnable();
  }

  /** ----------------------------------- Consultas Sevidor ----------------------------------- **/
  getCuenta(id_servicio: number) {
    this.cuentaService.cuentaGet(id_servicio).subscribe(result => {
      result as ApiResult;

      if (result.boolean) {
        this.objCuenta = result.data[0] as Cuenta;

        this.formCuenta.patchValue({
          banco: this.objCuenta.banco,
          nro_cuenta: this.objCuenta.nro_cuenta,
          a_nombre: this.objCuenta.a_nombre,
          img: this.objCuenta.img
        });

        this.previsualizar = this.objCuenta.img;

        this.camposDisable();
      } else {
        this.typeView = 'agregar';
        this.camposEnable();

        this.showLoadingImage = false;

        this.objCuenta.id_cuenta = id_servicio;
        this.objCuenta.id_servicio = id_servicio;
      }
      this.isLoading = false;
    });
  }

  agregarCuenta() {
    const data = {
      id_cuenta: this.id_servicio,
      id_servicio: this.id_servicio,
      banco: String(this.formCuenta.controls.banco.value),
      nro_cuenta: String(this.formCuenta.controls.nro_cuenta.value),
      a_nombre: String(this.formCuenta.controls.a_nombre.value),
      img: String(this.formCuenta.controls.img.value),
      user_crea: this.userLogeado.user,
      user_mod: this.userLogeado.user,
    }

    this.cuentaService.cuentaRegistro(data).subscribe(result => {
      result as ApiResult;

      if (result.boolean) {
        this.uploadImage();
      } else {
        this.customErrorToast(result.message);
        this.isLoading = false;
      }
    });
  }

  actualizarCuenta() {
    const data = {
      banco: String(this.formCuenta.controls.banco.value),
      nro_cuenta: String(this.formCuenta.controls.nro_cuenta.value),
      a_nombre: String(this.formCuenta.controls.a_nombre.value),
      img: String(this.formCuenta.controls.img.value),
      user_mod: this.userLogeado.user
    }

    this.cuentaService.cuentaActualizar(String(this.id_servicio), data).subscribe(result => {
      result as ApiResult;

      if (result.boolean) {
        if(this.archivoSelected){
          this.uploadImage();
        } else {
          this.customSuccessToast(result.message);
          this.isLoading = false;
          this.typeView = 'ver';
        }
      } else {
        this.customErrorToast(result.message);
        this.isLoading = false;
      }
    });

  }

  uploadImage() {
    const formData = new FormData();
    formData.append('image', this.archivoSelected, this.archivoSelected.name);
    formData.append('fileName', 'my-filename' || ''); // Use fileName if provided, otherwise empty string
    this.cuentaService.upload(formData, this.fileName).subscribe(
      event => {

        if (event.type === HttpEventType.UploadProgress) {
          if (event.total !== undefined) {
            // Loading...
          }
        } else if (event.type === HttpEventType.Response) {
          this.customSuccessToast('Imagen subido exitosamente');
          this.isLoading = false;
          this.typeView = 'ver';
        }
      },
      error => {
        this.customErrorToast('Error al subir el archivo');
        this.isLoading = false;
      });
  }

  /** ---------------------------------- Onclick file import ---------------------------------- **/
  async capturarImagen(event: any) {
    console.log(event)
    const archivoCapturado = event.target.files[0] as File;

    if (archivoCapturado) {
      this.archivoSelected = archivoCapturado;

      try {
        this.previsualizar = await this.imagenBase64(archivoCapturado);
      } catch (error) {
        console.error('Error al convertir la imagen a base64:', error);
      }

      const ext = archivoCapturado.name.split('.').pop();
      this.fileName = this.objCuenta.id_cuenta + '.' + ext;
      this.formCuenta.controls.img.setValue(urlBaseApi + '/cuenta/' + this.fileName);
    } else {
      this.archivoSelected = null;
      this.previsualizar = '';
      this.formCuenta.controls.img.setValue('');
    }
  }

  /** ---------------------------------------- Receiver --------------------------------------- **/

  /** --------------------------------------- ShowAlerts -------------------------------------- **/
  customSuccessToast(msg: string) {
    this.toast.loading
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
