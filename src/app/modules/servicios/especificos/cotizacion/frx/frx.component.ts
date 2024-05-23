import { formatDate } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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

import { CotizacionFrx } from 'src/app/shared/interfaces/app/frx-module/cotizacion-frx';
import { getCodigoServicioNum } from 'src/app/shared/utils/utils.utils';
import { MuestraFrxService } from 'src/app/shared/services/frx-module/muestra-frx/muestra-frx.service';
import { MuestraParametroFrxService } from 'src/app/shared/services/frx-module/muestra-parametro-frx/muestra-parametro-frx.service';

import { PersonaService } from 'src/app/shared/services/cliente-module/persona/persona.service';
import { UsuarioService } from 'src/app/shared/services/sesion-module/usuario/usuario.service';
import { ResponseEvent } from 'src/app/shared/interfaces/event/response.event';
import { Cuenta } from 'src/app/shared/interfaces/app/servicio-module/cuenta';
import { CuentaService } from 'src/app/shared/services/servicio-module/cuenta/cuenta.service';
import { RecepcionFrxService } from 'src/app/shared/services/frx-module/recepcionFrx/recepcion-frx.service';
import { admiRecepcionFRXLista } from 'src/app/shared/utils/routers/recepcion.route';
import { pdfCotizacionFRX } from 'src/app/shared/utils/pdf/cotizacion.frx.pdf';

@Component({
  selector: 'app-frx',
  templateUrl: './frx.component.html',
  styleUrls: ['./frx.component.css']
})
export class FrxComponent implements OnInit {
  /** -------------------------------------- Constructor -------------------------------------- **/
  constructor(
    private router: Router,
    private toast: HotToastService,
    private cotizacionFrxService: CotizacionFrxService,
    private muestraFrxService: MuestraFrxService,
    private muestraParametroFrxService: MuestraParametroFrxService,
    private personaService: PersonaService,
    private usuarioService: UsuarioService,
    private cuentaService: CuentaService,
    private recepcionFrxService: RecepcionFrxService
  ) {
    if (getLocalDataLogged() != null) {
      this.dataLocalStorage = getLocalDataLogged();
      if (this.dataLocalStorage.usuario != null) {
        this.userLogeado = this.dataLocalStorage.usuario;
        this.tecnicoUser = this.userLogeado;
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

    switch (this.typeRecive) {
      case 'agregar':
        this.tecnicoUser = this.userLogeado;
        this.showBusqueda = true;
        break;

      case 'ver':
        this.formCotizacion.controls.cod_cotizacion.setValue(this.codeRecive);
        this.formCotizacion.controls.observacion.disable();
        this.getCotizacion();
        break;

      case 'editar':
        this.formCotizacion.controls.cod_cotizacion.setValue(this.codeRecive);
        this.getCotizacion();
        break
    }
  }

  /** ---------------------------------- Variables de Inicio ---------------------------------- **/
  @Input() typeRecive!: string;
  @Input() codeRecive!: string;

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
  _ID_TIPO_SERVICIO: number = 2; // Específico
  _ID_SERVICIO: number = 1; // FRX

  tecnicoUser!: Usuario;

  typeDatePicker: string = ''; // Solicitud - Emision

  formCotizacion = new FormGroup({
    cod_cotizacion: new FormControl('', [Validators.required]),
    fec_solicitud: new FormControl(this.generatedFechaSolicitudHoy(), [Validators.required]), // 'yyyy-MM-dd'
    fec_emision: new FormControl(''), // 'yyyy-MM-dd'
    id_servicio: new FormControl(this._ID_SERVICIO, [Validators.required]),
    id_persona: new FormControl(0, [Validators.required]),
    observacion: new FormControl(''),
    costo_total: new FormControl(0, [Validators.required]),
    descuento: new FormControl(0, [Validators.required]),
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
    direccion: '',
    telefono: '',
    web: '',
    ciudad: '',
    pais: '',
    nit: '',
    tipo: '',

    fec_crea: '',
    user_crea: '',
    fec_mod: '',
    user_mod: ''
  }

  showBusqueda: boolean = false;
  showBusquedaParametro: boolean = false;
  showAddMuestra: boolean = false;
  showDatePicker: boolean = false;
  showAlertDescuento: boolean = false;

  labelDatePicker: string = ''; // Label de Datapicker
  fechaSendDatePicker: string = '';

  muestraSecIndexAdd: number = 0;

  dataMuestras: MuestraFrx[] = [];


  // Para Imprimir
  objCotizacionFRX: CotizacionFrx = {
    cod_cotizacion: '',
    fec_solicitud: '',
    fec_emision: '',
    id_servicio: 0,
    id_persona: 0,
    observacion: '',
    costo_total: 0,
    descuento: 0,
    total_pagar: 0,
    fec_crea: '',
    user_crea: '',
    fec_mod: '',
    user_mod: ''
  };

  emitResponse: boolean = false;

  isRecepcionado: boolean = false;

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
    costo_total = total_pagar - descuento;
    this.formCotizacion.controls.costo_total.setValue(costo_total);
  }

  /** ------------------------------------ Methods onClick ------------------------------------ **/
  onClickShowFechaSelect(type: string, label: string) {
    if (this.typeRecive !== 'ver') {
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

  onClickRemoveParametro(mIndex: number, pIndex: number) {
    this.dataMuestras[mIndex].muestra_parametros.splice(pIndex, 1);
    this.actualizarCostos();
  }


  onClickDescuento() {
    if (this.typeRecive === 'agregar') {
      this.showAlertDescuento = true;
    }
  }
  // ============= OnClick Guardar Cotizacion =============\\
  onClickAgregarCotizacion() {
    if (this.formCotizacion.valid) {
      this.isLoading = true;
      if (this.typeRecive === 'agregar') {
        this.agregarCotizacion();
      } else {
        this.editarCotizacion();
      }
    }
  }

  onClickCancel() {
    this.response.emit(this.emitResponse);
  }

  onClickPDF(type: string) {
    this.isLoading = true;

    this.cuentaService.cuentaGet(this._ID_SERVICIO).subscribe(result => {
      result as ApiResult;

      if (result.boolean) {
        const cuenta = result.data[0] as Cuenta;
        this.isLoading = false;
        this.goPdf(type, cuenta);
      } else {
        this.customErrorToast(result.message);
        this.isLoading = false;
      }
    });
  }

  onClickActualizar() {
    this.typeRecive = 'Actualizar';
    this.formCotizacion.controls.observacion.enable();
  }

  onClickRecepcionar() {
    this.isLoading = true;
    this.recepcionarDB();
  }

  /** ----------------------------------- Consultas Sevidor ----------------------------------- **/
  getCotizacionNow() {
    const dateNow = formatDate(new Date(), 'YYYY-MM-dd', 'es');
    this.cotizacionFrxService.cotizacionGetNow(dateNow).subscribe(result => {
      result as ApiResult;

      if (result.boolean) {
        const d = result.data as CotizacionFrx[];
        const lastcCodigo = d[d.length - 1].cod_cotizacion;
        this.generarCodCotizacion(getCodigoServicioNum(lastcCodigo));
      } else {
        this.generarCodCotizacion('001');
      }
    });
  }

  editarCotizacion() {
    const data = {
      cod_cotizacion: String(this.formCotizacion.controls.cod_cotizacion.value),
      fec_solicitud: String(this.formCotizacion.controls.fec_solicitud.value),
      fec_emision: String(this.formCotizacion.controls.fec_emision.value),
      id_servicio: this._ID_SERVICIO,
      id_persona: Number(this.formCotizacion.controls.id_persona.value),
      observacion: String(this.formCotizacion.controls.observacion.value),
      costo_total: Number(this.formCotizacion.controls.costo_total.value),
      descuento: Number(this.formCotizacion.controls.descuento.value),
      total_pagar: Number(this.formCotizacion.controls.total_pagar.value),
      user_crea: this.userLogeado.user,
      user_mod: this.userLogeado.user,
    };

    this.cotizacionFrxService.cotizacionActualizar(data.cod_cotizacion, data).subscribe(result => {
      result as ApiResult;

      if (result.boolean) {
        this.emitResponse = true;
        this.customSuccessToast('Se ha guardado correctamente!!!');
        this.typeRecive = 'ver';
        this.formCotizacion.controls.observacion.disable();

        this.objCotizacionFRX.fec_emision = data.fec_emision;
        this.objCotizacionFRX.observacion = data.observacion;
      } else {
        this.customErrorToast(result.message);
      }
      this.isLoading = false;
    });
  }

  agregarCotizacion() {
    const data = {
      cod_cotizacion: String(this.formCotizacion.controls.cod_cotizacion.value),
      fec_solicitud: String(this.formCotizacion.controls.fec_solicitud.value),
      fec_emision: String(this.formCotizacion.controls.fec_emision.value),
      id_servicio: this._ID_SERVICIO,
      id_persona: Number(this.formCotizacion.controls.id_persona.value),
      observacion: String(this.formCotizacion.controls.observacion.value),
      costo_total: Number(this.formCotizacion.controls.costo_total.value),
      descuento: Number(this.formCotizacion.controls.descuento.value),
      total_pagar: Number(this.formCotizacion.controls.total_pagar.value),
      user_crea: this.userLogeado.user,
      user_mod: this.userLogeado.user,
    };

    this.cotizacionFrxService.cotizacionRegistro(data).subscribe(result => {
      result as ApiResult;

      if (result.boolean) {
        this.objCotizacionFRX = result.data[0] as CotizacionFrx;

        this.agregarMuestra();
      } else {
        this.customErrorToast(result.message);
        this.isLoading = false;
      }
    });
  }

  agregarMuestra() {

    const dataArray = [];

    for (let i = 0; i < this.dataMuestras.length; i++) {
      const data = {
        cod_cotizacion: this.dataMuestras[i].cod_cotizacion,
        muestra_sec: this.dataMuestras[i].muestra_sec,
        costo_muestra: this.dataMuestras[i].costo_muestra,
        cod_interno: this.dataMuestras[i].cod_interno,
        descripcion: this.dataMuestras[i].descripcion,
        observacion: this.dataMuestras[i].observacion,

        user_crea: this.dataMuestras[i].user_crea,
        user_mod: this.dataMuestras[i].user_mod,
      }

      dataArray.push(data);
    }

    this.muestraFrxService.muestraAdd(dataArray).subscribe(result => {
      result as ApiResult;
      if (result.boolean) {
        this.agregarMuestraParametro();
      } else {
        this.customErrorToast(result.message);
        this.isLoading = false;
      }
    });
  }

  agregarMuestraParametro() {
    const dataArray = [];

    for (let i = 0; i < this.dataMuestras.length; i++) {
      for (let j = 0; j < this.dataMuestras[i].muestra_parametros.length; j++) {
        const data = {
          cod_cotizacion: this.dataMuestras[i].muestra_parametros[j].cod_cotizacion,
          muestra_sec: this.dataMuestras[i].muestra_parametros[j].muestra_sec,
          parametro_sec: this.dataMuestras[i].muestra_parametros[j].parametro_sec,
          id_parametro: this.dataMuestras[i].muestra_parametros[j].id_parametro,
          cantidad: this.dataMuestras[i].muestra_parametros[j].cantidad,
          costo_parametro_unitario: this.dataMuestras[i].muestra_parametros[j].costo_parametro_unitario,
          costo_parametro_total: this.dataMuestras[i].muestra_parametros[j].costo_parametro_total,
          observacion: this.dataMuestras[i].muestra_parametros[j].observacion,

          user_crea: this.dataMuestras[i].muestra_parametros[j].user_crea,
          user_mod: this.dataMuestras[i].muestra_parametros[j].user_mod,
        }
        dataArray.push(data);
      }
    }

    this.muestraParametroFrxService.muestraParametroAdd(dataArray).subscribe(result => {
      result as ApiResult;

      if (result.boolean) {
        this.emitResponse = true;
        this.isLoading = false;
        this.customSuccessToast('Se agregó correctamente!!!');
        this.typeRecive = 'ver';
      } else {
        this.customErrorToast(result.message);
        this.isLoading = false;
      }
    });
  }



  getCotizacion() {
    this.isLoading = true;
    this.cotizacionFrxService.cotizacionGet(this.codeRecive).subscribe(result => {
      result as ApiResult;

      if (result.rows > 0) {
        const obj = result.data[0] as CotizacionFrx;

        this.formCotizacion.controls.cod_cotizacion.setValue(obj.cod_cotizacion);
        this.formCotizacion.controls.fec_solicitud.setValue(obj.fec_solicitud);
        this.formCotizacion.controls.fec_emision.setValue(obj.fec_emision);
        this.formCotizacion.controls.id_servicio.setValue(obj.id_servicio);
        this.formCotizacion.controls.id_persona.setValue(obj.id_persona);
        this.formCotizacion.controls.observacion.setValue(obj.observacion);
        this.formCotizacion.controls.costo_total.setValue(obj.costo_total);
        this.formCotizacion.controls.descuento.setValue(obj.descuento);
        this.formCotizacion.controls.total_pagar.setValue(obj.total_pagar);

        this.objCotizacionFRX = obj;

        this.getTecnico(obj.user_crea);
      }
    });
  }

  getTecnico(user: string) {
    this.usuarioService.usuarioGetUser(user).subscribe(result => {
      result as ApiResult;

      if (result.boolean) {
        this.tecnicoUser = result.data[0] as Usuario;
        this.getCliente();
      } else {
        this.customErrorToast(result.message);
      }
    });
  }

  getCliente() {
    this.personaService.personaBusquedaID(Number(this.formCotizacion.controls.id_persona.value)).subscribe(result => {
      result as ApiResult;

      if (result.rows > 0) {
        const per = result.data[0] as Persona;

        this.personaC = per;

        if (this.personaC.id_persona !== 0) {
          this.empresaC = per.id_empresa as Empresa;
        }

        this.getMuestras();
      }
    });
  }

  getMuestras() {
    this.muestraFrxService.muestraGet(this.codeRecive).subscribe(result => {
      result as ApiResult;

      if (result.rows > 0) {
        this.dataMuestras = result.data;
      }
      this.getIsRecepcion();
    });
  }

  getIsRecepcion() {
    this.recepcionFrxService.recepcionFrxGetUno(this.objCotizacionFRX.cod_cotizacion).subscribe(result => {
      result as ApiResult;

      this.isRecepcionado = result.boolean;
      this.isLoading = false;
    });
  }

  recepcionarDB(){
    const data = {
      cod_cotizacion: this.objCotizacionFRX.cod_cotizacion,
      fec_recepcion: formatDate(new Date(),'yyyy-MM-dd','es'),
      user_recepcion: this.userLogeado.user,

      user_crea: this.userLogeado.user,
      user_mod: this.userLogeado.user,
    }
    this.recepcionFrxService.recepcionFrxRegistro(data).subscribe(result => {
      result as ApiResult;

      if (result.boolean) {
        this.customSuccessToast('Se agregó correctamente!!!');
        this.isRecepcionado = true;
        //admiRecepcionFRXLista(this.router);
      } else {
        this.customErrorToast(result.message);
      }
      this.isLoading = false;
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

  inputDescuentoResponse(event: ResponseEvent) {
    if (event.bool) {
      this.formCotizacion.controls.descuento.setValue(event.data);
      this.actualizarCostos();
    }
    this.showAlertDescuento = false;
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

  /** --------------------------------------- Create PDF -------------------------------------- **/
  convertDate(data: string): string {
    try {
      return formatDate(data, 'dd/MM/yyyy', 'es')
    } catch (error) {
      return '';
    }
  }

  goPdf(type: string, cuenta: Cuenta) {

    let serParametros = [];

    for (let i = 0; i < this.dataMuestras.length; i++) {
      const parametrosLista = this.dataMuestras[i].muestra_parametros as MuestraParametroFrx[];

      for (let j = 0; j < parametrosLista.length; j++) {
        const parametro = parametrosLista[j].parametro as Parametro;

        if (serParametros.length > 0) {
          let existe = false;

          for (let k = 0; k < serParametros.length; k++) {
            if (serParametros[k].id === parametro.id_parametro) {
              serParametros[k].cantidad = serParametros[k].cantidad + 1;
              existe = true;
              break;
            }
          }

          if (!existe) {
            const data = {
              id: parametro.id_parametro,
              parametro: parametro.nombre,
              precio: parametro.costo_directo,
              cantidad: 1
            }
            serParametros.push(data);
          }
        } else {
          const data = {
            id: parametro.id_parametro,
            parametro: parametro.nombre,
            precio: parametro.costo_directo,
            cantidad: 1
          }
          serParametros.push(data);
        }
      }
    }

    let tableData = [];

    tableData.push(
      [
        { text: 'Nro', style: 'titletable' },
        { text: 'DESCRIPCIÓN DEL SERVICIO', style: 'titletable' },
        { text: 'CANTIDAD', style: 'titletable' },
        { text: 'COSTO\nUNITARIO BS.', style: 'titletable' },
        { text: 'COSTO\nTOTAL BS.', style: 'titletable' },
      ]
    );

    for (let i = 0; i < serParametros.length; i++) {
      const d = serParametros[i];
      // push de muestras
      tableData.push(
        [
          { text: i + 1, style: 'texttable' },
          { text: d.parametro, style: 'texttable' },
          { text: d.cantidad, style: 'texttable' },
          { text: "Bs. " + d.precio, style: 'texttable' },
          { text: "Bs. " + d.precio * d.cantidad, style: 'texttable' },
        ]
      );
    }

    let servicios = '';
    for (let i = 0; i < serParametros.length; i++) {
      const d = serParametros[i];

      if (servicios.length === 0) {
        servicios = serParametros[i].parametro;
      } else {
        servicios = servicios + ' - ' + serParametros[i].parametro;
      }
    }

    pdfCotizacionFRX(type, this.objCotizacionFRX, this.personaC, servicios, tableData, cuenta);
  }
}
