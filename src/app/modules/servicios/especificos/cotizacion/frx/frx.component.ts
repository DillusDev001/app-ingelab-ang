import { formatDate } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { initFlowbite } from 'flowbite';
import { ApiResult } from 'src/app/shared/interfaces/api/api.result';
import { Empresa } from 'src/app/shared/interfaces/app/cliente-module/empresa';
import { Persona } from 'src/app/shared/interfaces/app/cliente-module/persona';
import { MuestraFrx } from 'src/app/shared/interfaces/app/frx-module/muestra-frx';
import { MuestraParametroFrx } from 'src/app/shared/interfaces/app/frx-module/muestra-parametro-frx';
import { Parametro } from 'src/app/shared/interfaces/app/frx-module/parametro';
import { Usuario } from 'src/app/shared/interfaces/app/sesion-module/usuario';
import { DataLocalStorage } from 'src/app/shared/interfaces/local/data-local-storage';
import { CotizacionFrxService } from 'src/app/shared/services/frx-module/cotizacion-frx/cotizacion-frx.service';
import { goLogin } from 'src/app/shared/utils/local.router';
import { deleteLocalStorageData, getLocalDataLogged } from 'src/app/shared/utils/local.storage';

@Component({
  selector: 'app-frx',
  templateUrl: './frx.component.html',
  styleUrls: ['./frx.component.css']
})
export class FrxComponent implements OnInit {
  /** ---------------------------------- Variables de Inicio ---------------------------------- **/
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

  result!: ApiResult;

  // ================  ================ //
  _ID_TIPO_SERVICIO: number = 2; // Específico
  _ID_SERVICIO: number = 1; // FRX

  typeDatePicker: string = ''; // Solicitud - Emision

  formCotizacion = new FormGroup({
    cod_cotizacion: new FormControl('', [Validators.required]),
    fec_solicitud: new FormControl(this.generatedFechaSolicitudHoy(), [Validators.required]), // 'yyyy-MM-dd'
    fec_emision: new FormControl(''), // 'yyyy-MM-dd'
    id_persona: new FormControl(0, [Validators.required]),
    observacion: new FormControl(''),
    costo_total: new FormControl(0, [Validators.required]),
    descuento: new FormControl(10, [Validators.required]),
    total_pagar: new FormControl(0, [Validators.required]),
  })

  personaC: Persona = {
    id_persona: 0,
    nombre_persona: '',
    celular: '',
    email: '',
    razon: '',
    nit: '',
    id_empresa: 0,

    fec_crea: '',
    user_crea: '',
    fec_mod: '',
    user_mod: ''
  }

  empresaC: Empresa = {
    id_empresa: 0,
    razon_social: '',
    nit: '',
    direccion: '',
    telefono: '',
    web: '',
    ciudad: '',
    pais: '',

    fec_crea: '',
    user_crea: '',
    fec_mod: '',
    user_mod: ''
  }

  showBusqueda: boolean = true;
  showBusquedaParametro: boolean = false;
  showAddMuestra: boolean = false;
  showDatePicker: boolean = false;

  labelDatePicker: string = ''; // Label de Datapicker
  fechaSendDatePicker: string = '';

  muestraSecIndexAdd: number = 0;

  dataMuestras: MuestraFrx[] = [];

  /** -------------------------------------- Constructor -------------------------------------- **/
  constructor(
    private router: Router,
    private toast: HotToastService,
    private cotizacionFrxService: CotizacionFrxService
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
  generarCodCotizacion(sec: string) {
    // obtener contador
    this.formCotizacion.controls.cod_cotizacion.setValue('INGLAB-CTZ-LAB-' + formatDate(new Date(), 'ddMMYY', 'es') + '-' + sec);
  }

  generatedFechaSolicitudHoy(): string {
    return formatDate(new Date(), 'yyyy-MM-dd', 'es');
  }

  // Para UI vista Fecha
  transformFecha(type: string): string {
    switch (type) {
      case 'Solicitud':
        let s = String(this.formCotizacion.controls.fec_solicitud.value)
        if (s !== '') {
          return formatDate(s, 'dd/MM/yyyy', 'es');
        } else {
          return '';
        }

      case 'Emision':
        let e = String(this.formCotizacion.controls.fec_emision.value)
        if (e !== '') {
          return formatDate(e, 'dd/MM/yyyy', 'es');
        } else {
          return '';
        }

      default: return '';
    }
  }

  transformCostos(type: string): string {
    switch (type) {
      case 'Costo Total':
        return String(this.formCotizacion.controls.costo_total.value);

      case 'Descuento':
        return String(this.formCotizacion.controls.descuento.value);

      case 'Total Pagar':
        return String(this.formCotizacion.controls.total_pagar.value);

      default: return '';
    }
  }

  containsParametro(_id: number): boolean {

    const muestra = this.dataMuestras[this.muestraSecIndexAdd];
    for (let i = 0; i < muestra.muestra_parametros.length; i++) {
      if (muestra.muestra_parametros[i].id_parametro === _id) {
        return true;
      }
    }

    return false;
  }

  actualizarCostos() {
    let total_pagar = 0;
    let descuento = Number(this.formCotizacion.controls.descuento.value);
    let costo_total = 0;

    for (let i = 0; i < this.dataMuestras.length; i++) {
      for (let j = 0; j < this.dataMuestras[i].muestra_parametros.length; j++)
        total_pagar += this.dataMuestras[i].muestra_parametros[j].costo_parametro_total;
    }

    this.formCotizacion.controls.total_pagar.setValue(total_pagar);
    costo_total = total_pagar - ((total_pagar * descuento) / 100);
    this.formCotizacion.controls.costo_total.setValue(costo_total);
  }

  /** ------------------------------------ Methods onClick ------------------------------------ **/
  onClickShowFechaSelect(type: string, label: string) {
    this.typeDatePicker = type;
    this.labelDatePicker = label;

    switch (type) {
      case 'Solicitud':
        this.fechaSendDatePicker = String(this.formCotizacion.controls.fec_solicitud.value);
        break;

      case 'Emision':
        this.fechaSendDatePicker = String(this.formCotizacion.controls.fec_emision.value);
        break;
    }
    this.showDatePicker = true;
  }

  onClickBusquedaCliente() {
    this.showBusqueda = true;
  }

  onClickAgregarMuestra() {
    this.showAddMuestra = true;
  }

  // ============= OnClick Muestra =============\\
  onClickAgregarParametroMuestra(n: number) {
    this.muestraSecIndexAdd = n;
    this.showBusquedaParametro = true;
  }

  onClickEliminarParametroMuestra(n: number) {
    this.dataMuestras.splice(n, 1);
    for (let i = 0; i < this.dataMuestras.length; i++) {
      const sec = i + 1;
      this.dataMuestras[i].muestra_sec = sec;

      for (let j = 0; j < this.dataMuestras[i].muestra_parametros.length; j++) {
        this.dataMuestras[i].muestra_parametros[j].muestra_sec = sec;
      }
    }

    this.actualizarCostos();
  }

  // ============= OnClick ParametroMuestra =============\\
  // mIndex: number, pIndex: number
  onClickPlusCantidad(mIndex: number, pIndex: number) {
    this.dataMuestras[mIndex].muestra_parametros[pIndex].cantidad += 1;
    this.dataMuestras[mIndex].muestra_parametros[pIndex].costo_parametro_total = this.dataMuestras[mIndex].muestra_parametros[pIndex].costo_parametro_unitario * this.dataMuestras[mIndex].muestra_parametros[pIndex].cantidad;

    let _dataMuestraParametro = this.dataMuestras[mIndex].muestra_parametros;

    let sum = 0;
    for (let i = 0; i < _dataMuestraParametro.length; i++) {
      sum += _dataMuestraParametro[i].costo_parametro_total;
    }

    this.dataMuestras[mIndex].costo_muestra = sum;

    this.actualizarCostos();
  }

  onClickLessCantidad(mIndex: number, pIndex: number) {

    if (this.dataMuestras[mIndex].muestra_parametros[pIndex].cantidad - 1 > 0) {
      this.dataMuestras[mIndex].muestra_parametros[pIndex].cantidad -= 1;
      this.dataMuestras[mIndex].muestra_parametros[pIndex].costo_parametro_total = this.dataMuestras[mIndex].muestra_parametros[pIndex].costo_parametro_unitario * this.dataMuestras[mIndex].muestra_parametros[pIndex].cantidad;

      let _dataMuestraParametro = this.dataMuestras[mIndex].muestra_parametros;

      let sum = 0;
      for (let i = 0; i < _dataMuestraParametro.length; i++) {
        sum += _dataMuestraParametro[i].costo_parametro_total;
      }

      this.dataMuestras[mIndex].costo_muestra = sum;

      this.actualizarCostos();
    } else {
      this.customErrorToast('Cantidad mínima alcanzada.')
    }
  }

  onClickAgregarCotizacion() {

  }

  onClickCancel() {
    this.response.emit(false);
  }



  /** ----------------------------------- Consultas Sevidor ----------------------------------- **/
  getCotizacionNow() {
    const dateNow = formatDate(new Date(), 'YYYY-MM-dd', 'es');
    this.cotizacionFrxService.cotizacionGetNow(dateNow).subscribe(result => {
      result as ApiResult;

      if (result.boolean) {

      } else {
        this.generarCodCotizacion('001');
      }
    });

  }

  /** ---------------------------------- Onclick file import ---------------------------------- **/

  /** ---------------------------------------- Receiver --------------------------------------- **/
  busquedaClienteResponse(event: any) {
    if (event === null) {
      if (this.personaC.id_persona === 0) {
        this.response.emit(false);
      } else {
        this.showBusqueda = false;
      }
    } else {
      this.personaC = event as Persona;
      this.formCotizacion.controls.id_persona.setValue(this.personaC.id_persona);

      if (this.personaC.id_empresa === 0) {
        this.empresaC == null;
      } else {
        this.empresaC = this.personaC.id_empresa as Empresa;
      }

      this.showBusqueda = false;
      this.getCotizacionNow();
    }
  }

  fechaSelectResponse(value: string) {
    switch (this.typeDatePicker) {
      case 'Solicitud':
        this.formCotizacion.controls.fec_solicitud.setValue(value);
        break;

      case 'Emision':
        this.formCotizacion.controls.fec_emision.setValue(value);
        break;
    }
    this.showDatePicker = false;
  }

  addMuestraResponse(event: any) {
    if (event !== null) {
      let element = event as MuestraFrx;

      element.cod_cotizacion = String(this.formCotizacion.controls.cod_cotizacion.value);

      if (this.dataMuestras.length > 0) {
        element.muestra_sec = this.dataMuestras[this.dataMuestras.length - 1].muestra_sec + 1;
      } else {
        element.muestra_sec = 1;
      }

      element.user_crea = this.userLogeado.user;
      element.user_mod = this.userLogeado.user;

      this.dataMuestras.push(element);
      this.showAddMuestra = false;
    } else {
      this.showAddMuestra = false;
    }
  }

  busquedaParametroResponse(event: any) {
    if (event !== null) {
      // agregar a dataMuestrasParametro
      const element = event as Parametro;

      if (!this.containsParametro(element.id_parametro)) {
        const cod = String(this.formCotizacion.controls.cod_cotizacion.value);
        const sec = this.dataMuestras[this.muestraSecIndexAdd].muestra_sec;

        let _dataMuestraParametro = this.dataMuestras[this.muestraSecIndexAdd].muestra_parametros;

        let muestraParametro = {
          cod_cotizacion: cod,
          muestra_sec: sec,
          parametro_sec: _dataMuestraParametro.length == 0 ? 1 : _dataMuestraParametro[_dataMuestraParametro.length - 1].parametro_sec + 1,
          id_parametro: element.id_parametro,
          cantidad: 1,
          costo_parametro_unitario: _dataMuestraParametro.length == 0 ? element.costo_directo : element.costo_variable,
          costo_parametro_total: _dataMuestraParametro.length == 0 ? element.costo_directo : element.costo_variable,
          observacion: '',
          parametro: element,

          fec_crea: '',
          user_crea: this.userLogeado.user,
          fec_mod: '',
          user_mod: this.userLogeado.user,
        } as MuestraParametroFrx;

        this.dataMuestras[this.muestraSecIndexAdd].muestra_parametros.push(muestraParametro);

        let sum = 0;
        for (let i = 0; i < _dataMuestraParametro.length; i++) {
          sum += _dataMuestraParametro[i].costo_parametro_total;
        }

        this.dataMuestras[this.muestraSecIndexAdd].costo_muestra = sum;

        this.actualizarCostos();
        this.showBusquedaParametro = false;

      } else {
        this.customErrorToast(element.nombre + ' ya se encuentra agregado para esta muestra!!!');
      }
    } else {
      this.showBusquedaParametro = false;
    }
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
