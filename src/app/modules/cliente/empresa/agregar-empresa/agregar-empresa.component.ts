import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { initFlowbite } from 'flowbite';
import { ApiResult } from 'src/app/shared/interfaces/api/api.result';
import { Empresa } from 'src/app/shared/interfaces/app/cliente-module/empresa';
import { Persona } from 'src/app/shared/interfaces/app/cliente-module/persona';
import { Usuario } from 'src/app/shared/interfaces/app/sesion-module/usuario';
import { DataLocalStorage } from 'src/app/shared/interfaces/local/data-local-storage';
import { EmpresaService } from 'src/app/shared/services/cliente-module/empresa/empresa.service';
import { PersonaService } from 'src/app/shared/services/cliente-module/persona/persona.service';
import { arrayCiudad, arrayPais, arrayTipoEmpresa } from 'src/app/shared/utils/local.array';
import { goAdminMantenimientoCliente, goLogin } from 'src/app/shared/utils/local.router';
import { deleteLocalStorageData, getLocalDataLogged } from 'src/app/shared/utils/local.storage';

@Component({
  selector: 'app-agregar-empresa',
  templateUrl: './agregar-empresa.component.html',
  styleUrls: ['./agregar-empresa.component.css']
})
export class AgregarEmpresaComponent implements OnInit {
  /** -------------------------------------- Constructor -------------------------------------- **/
  constructor(
    private router: Router,
    private toast: HotToastService,
    private empresaService: EmpresaService,
    private personaService: PersonaService,
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

    this.formPersona.controls.id_empresa.disable();
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
  formPersona = new FormGroup({
    id_persona: new FormControl(0, [Validators.required]),
    nombre_persona: new FormControl('', [Validators.required]),
    celular: new FormControl('', [Validators.required]),
    email: new FormControl('', []),
    razon: new FormControl('', [Validators.required]),
    nit: new FormControl('', [Validators.required]),
    id_empresa: new FormControl(0, [Validators.required]),
  });

  formEmpresa = new FormGroup({
    id_empresa: new FormControl(0, [Validators.required]),
    razon_social: new FormControl('', [Validators.required]),
    direccion: new FormControl('', [Validators.required]),
    telefono: new FormControl('', [Validators.required]),
    web: new FormControl('', [Validators.required]),
    ciudad: new FormControl('La Paz', [Validators.required]),
    pais: new FormControl('Bolivia', [Validators.required]),
    nit: new FormControl('', [Validators.required]),
    tipo: new FormControl('', [Validators.required]),
  });

  dataCiudad = arrayCiudad;
  dataPais = arrayPais;
  dataTipoEmpresa = arrayTipoEmpresa;

  showBusquedaEmpresa: boolean = false;



  /** ---------------------------------------- Methods ---------------------------------------- **/

  /** ------------------------------------ Methods onClick ------------------------------------ **/
  onClickGuardar() {
    if (this.formPersona.valid) {
      this.isLoading = true;
      if (Number(this.formPersona.controls.id_empresa.value) === 0) {
        // Agregar Empresa
        if (String(this.formEmpresa.controls.razon_social.value) !== '') {
          if (this.formEmpresa.valid) {
            this.agregarEmpresa(true);
          } else {
            this.customErrorToast('Campos necesarios!!!');
          }
        } else {
          this.agregarPersona();
        }
      } else {
        // Agregar Persona
        this.agregarPersona();
      }
    } else {
      console.log(this.formPersona.value);
    }
  }

  onClickFindEmpresa() {
    this.showBusquedaEmpresa = true;
  }

  /** ----------------------------------- Consultas Sevidor ----------------------------------- **/
  agregarEmpresa(val: boolean) {
    const data = {
      razon_social: String(this.formEmpresa.controls.razon_social.value),
      direccion: String(this.formEmpresa.controls.direccion.value),
      telefono: String(this.formEmpresa.controls.telefono.value),
      web: String(this.formEmpresa.controls.web.value),
      ciudad: String(this.formEmpresa.controls.ciudad.value),
      pais: String(this.formEmpresa.controls.pais.value),
      nit: String(this.formEmpresa.controls.nit.value),
      tipo: String(this.formEmpresa.controls.tipo.value),
      user_crea: this.userLogeado.user,
      user_mod: this.userLogeado.user,
    } as Empresa;

    this.empresaService.empresaAdd(data).subscribe(result => {
      result as ApiResult;

      if (result.boolean) {
        // Agregar id_empresa a Persona Form
        if (val) {
          const id_empresa = Number(result.data[0]);
          this.formPersona.controls.id_empresa.setValue(id_empresa);
        }

        this.agregarPersona();

      } else {
        this.customErrorToast(result.message);
      }
    });
  }

  agregarPersona() {
    const data = {
      nombre_persona: String(this.formPersona.controls.nombre_persona.value),
      celular: String(this.formPersona.controls.celular.value),
      email: String(this.formPersona.controls.email.value),
      razon: String(this.formPersona.controls.razon.value),
      nit: String(this.formPersona.controls.nit.value),
      id_empresa: Number(this.formPersona.controls.id_empresa.value),
      user_crea: this.userLogeado.user,
      user_mod: this.userLogeado.user,
    } as Persona;

    this.personaService.personaAdd(data).subscribe(result => {
      result as ApiResult;

      if (result.boolean) {
        goAdminMantenimientoCliente(this.router);
      } else {
        this.customErrorToast(result.message);
      }
    });
  }

  /** ---------------------------------- Onclick file import ---------------------------------- **/

  /** ---------------------------------------- Receiver --------------------------------------- **/
  empresaSearchResponse(event: any) {
    if (event !== null) {
      const obj = event as Empresa;

      this.formEmpresa.controls.id_empresa.setValue(obj.id_empresa);
      this.formEmpresa.controls.razon_social.setValue(obj.razon_social);
      this.formEmpresa.controls.direccion.setValue(obj.direccion);
      this.formEmpresa.controls.telefono.setValue(obj.telefono);
      this.formEmpresa.controls.web.setValue(obj.web);
      this.formEmpresa.controls.ciudad.setValue(obj.ciudad);
      this.formEmpresa.controls.pais.setValue(obj.pais);
      this.formEmpresa.controls.nit.setValue(obj.nit);
      this.formEmpresa.controls.tipo.setValue(obj.tipo);

      this.formEmpresa.controls.id_empresa.disable();
      this.formEmpresa.controls.razon_social.disable();
      this.formEmpresa.controls.direccion.disable();
      this.formEmpresa.controls.telefono.disable();
      this.formEmpresa.controls.web.disable();
      this.formEmpresa.controls.ciudad.disable();
      this.formEmpresa.controls.pais.disable();
      this.formEmpresa.controls.nit.disable();
      this.formEmpresa.controls.tipo.disable();

      this.formPersona.controls.razon.setValue(obj.razon_social);
      this.formPersona.controls.nit.setValue(obj.nit);

      this.formPersona.controls.id_empresa.setValue(obj.id_empresa);

    }
    this.showBusquedaEmpresa = false;
  }

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
