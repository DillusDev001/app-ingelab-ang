import { formatDate } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { initFlowbite } from 'flowbite';
import { ApiResult } from 'src/app/shared/interfaces/api/api.result';
import { Empresa } from 'src/app/shared/interfaces/app/cliente-module/empresa';
import { Persona } from 'src/app/shared/interfaces/app/cliente-module/persona';
import { CotizacionGeneralSubServicio } from 'src/app/shared/interfaces/app/servicio-general-module/cotizacion-general-sub-servicio';
import { AsSubServicioSelectable } from 'src/app/shared/interfaces/app/servicio-module/as-sub-servicio-selectable';
import { CotizacionGeneral } from 'src/app/shared/interfaces/app/servicio-module/cotizacion-general';
import { Servicio } from 'src/app/shared/interfaces/app/servicio-module/servicio';
import { SubServicio } from 'src/app/shared/interfaces/app/servicio-module/sub-servicio';
import { Usuario } from 'src/app/shared/interfaces/app/sesion-module/usuario';
import { ResponseEvent } from 'src/app/shared/interfaces/event/response.event';
import { DataLocalStorage } from 'src/app/shared/interfaces/local/data-local-storage';
import { PersonaService } from 'src/app/shared/services/cliente-module/persona/persona.service';
import { CotizacionGeneralSubServicioService } from 'src/app/shared/services/servicio-generale-module/cotizacion-general-sub-servicio/cotizacion-general-sub-servicio.service';
import { CotizacionGeneralService } from 'src/app/shared/services/servicio-generale-module/cotizacion-general/cotizacion-general.service';
import { SubServicioService } from 'src/app/shared/services/servicio-module/sub-servicio/sub-servicio.service';
import { UsuarioService } from 'src/app/shared/services/sesion-module/usuario/usuario.service';
import { goLogin } from 'src/app/shared/utils/local.router';
import { deleteLocalStorageData, getLocalDataLogged } from 'src/app/shared/utils/local.storage';
import { getCodigoServicioNum } from 'src/app/shared/utils/utils.utils';

import { CotizacionGeneralSubServicios } from 'src/app/shared/interfaces/app/servicio-module/cotizacion_general_sub_servicios';
import { CuentaService } from 'src/app/shared/services/servicio-module/cuenta/cuenta.service';
import { Cuenta } from 'src/app/shared/interfaces/app/servicio-module/cuenta';
import { ServicioService } from 'src/app/shared/services/servicio-module/servicio/servicio.service';
import { pdfCotizacionGeneral } from 'src/app/shared/utils/pdf/cotizacion.general.pdf';

@Component({
  selector: 'app-cotizacion',
  templateUrl: './cotizacion.component.html',
  styleUrls: ['./cotizacion.component.css']
})
export class CotizacionComponent implements OnInit {
  /** -------------------------------------- Constructor -------------------------------------- **/
  constructor(
    private router: Router,
    private servicioService: ServicioService,
    private subServicioService: SubServicioService,
    private cotizacionGeneralService: CotizacionGeneralService,
    private cotizacionGeneralSubServicioService: CotizacionGeneralSubServicioService,
    private personaService: PersonaService,
    private usuarioService: UsuarioService,
    private cuentaService: CuentaService,
    private toast: HotToastService,
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
        this.showBusqueda = true;
        break;

      case 'ver':
        this.formCotizacion.controls.cod_cotizacion.setValue(this.codeRecive);
        this.formCotizacion.controls.observacion.disable();
        this.formCotizacion.controls.precio_servicio.disable();
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
  // ================  ================ //
  _ID_TIPO_SERVICIO: number = 1; // General
  servicioSelected: Servicio = {
    id_servicio: 0,
    nombre: '',
    descripcion: '',
    id_tipo_servicio: 0,
    fec_crea: '',
    user_crea: '',
    fec_mod: '',
    user_mod: ''
  };

  tecnicoUser!: Usuario;

  formEmpty = new FormGroup({
    empty: new FormControl('')
  });

  formCotizacion = new FormGroup({
    cod_cotizacion: new FormControl('', [Validators.required]),
    fec_solicitud: new FormControl(this.generatedFechaSolicitudHoy(), [Validators.required]), // 'yyyy-MM-dd'
    fec_emision: new FormControl(''), // 'yyyy-MM-dd'
    id_servicio: new FormControl(0, [Validators.required]),
    id_persona: new FormControl(0, [Validators.required]),
    precio_servicio: new FormControl(0, [Validators.required]),
    observacion: new FormControl(''),
    costo_total: new FormControl(0, [Validators.required]),
    descuento: new FormControl(0, [Validators.required]),
    total_pagar: new FormControl(0, [Validators.required]),
  })

  typeDatePicker: string = ''; // Solicitud - Emision

  fechaNow: string = formatDate(new Date(), 'dd/MM/yyyy', 'es');

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
  };

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
  showBusquedaServicio: boolean = false;
  showDatePicker: boolean = false;
  showAlertDescuento: boolean = false;

  labelDatePicker: string = ''; // Label de Datapicker
  fechaSendDatePicker: string = '';

  dataSubServicios: AsSubServicioSelectable[] = [];

  indexSubServicio: number = -1;

  typeAlertInput: string = '';

  labelAlertInput: string = '';

  iconlAlertInput: string = '';

  alertInputType: string = '';

  emitResponse: boolean = false;

  // Para Imprimir
  objCotizacion: CotizacionGeneral = {
    cod_cotizacion: '',
    fec_solicitud: '',
    fec_emision: '',
    id_servicio: 0,
    id_persona: 0,
    precio_servicio: 0,
    observacion: '',
    costo_total: 0,
    descuento: 0,
    total_pagar: 0,
    fec_crea: '',
    user_crea: '',
    fec_mod: '',
    user_mod: ''
  }


  /** ---------------------------------------- Methods ---------------------------------------- **/
  generarCodCotizacion(sec: string) {
    // obtener contador
    this.formCotizacion.controls.cod_cotizacion.setValue('INGLAB-CTZ-GEN-' + formatDate(new Date(), 'ddMMYY', 'es') + '-' + sec);
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

  actualizarCostos() {
    let suma = 0;
    for (let i = 0; i < this.dataSubServicios.length; i++) {
      if (this.dataSubServicios[i].boolean) {
        suma += this.dataSubServicios[i].sub_servicio.costo_sub_servicio;
      }
    }

    const precio = Number(this.formCotizacion.controls.precio_servicio.value);
    suma = suma + precio;

    if (suma > 0) {
      this.formCotizacion.controls.total_pagar.setValue(suma);
      const desc = Number(this.formCotizacion.controls.descuento.value);
      this.formCotizacion.controls.costo_total.setValue(suma - desc);
    } else {
      this.formCotizacion.controls.total_pagar.setValue(suma);
      this.formCotizacion.controls.costo_total.setValue(0);
    }

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

  onClickEditarCosto(value: string, index: number, inputType: string) {
    if (this.typeRecive === 'agregar') {
      this.labelAlertInput = value;
      this.typeAlertInput = value;
      this.indexSubServicio = index;
      this.showAlertDescuento = true;
      this.alertInputType = inputType;
    }
  }

  setValueCheckBox(index: number, value: boolean) {
    this.dataSubServicios[index].boolean = !value;

    this.actualizarCostos();
  }

  onClickDescuento(value: string) {
    if (this.typeRecive === 'agregar') {
      this.labelAlertInput = 'Descuento Bs.';
      this.typeAlertInput = value;
      this.showAlertDescuento = true;
    }
  }

  onChange(event: any) {
    this.actualizarCostos();
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

    this.cuentaService.cuentaGet(this.servicioSelected?.id_servicio).subscribe(result => {
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

  /** ----------------------------------- Consultas Sevidor ----------------------------------- **/
  getListaSubServicios(id_servicio: number) {
    this.subServicioService.subServicioGetLista(id_servicio).subscribe(result => {
      result as ApiResult;

      if (result.boolean) {
        for (let i = 0; i < result.data.length; i++) {
          let subServicio = result.data[i] as SubServicio;

          const newObj = {
            boolean: false,
            sub_servicio: {
              cod_cotizacion: String(this.formCotizacion.controls.cod_cotizacion.value),
              id_sub_servicio: subServicio.id_sub_servicio,
              costo_sub_servicio: 0,
              observacion: '',

              nombre: subServicio.nombre,
              descripcion: subServicio.descripcion,

              fec_crea: '',
              user_crea: '',
              fec_mod: '',
              user_mod: '',
            }
          }
          this.dataSubServicios.push(newObj);
        }
      } else {
        this.customErrorToast(result.message);
      }

      this.getCotizacionNow();
    });
  }

  getCotizacionNow() {
    const dateNow = formatDate(new Date(), 'YYYY-MM-dd', 'es');
    this.cotizacionGeneralService.cotizacionGetNow(dateNow).subscribe(result => {
      result as ApiResult;

      if (result.boolean) {
        const d = result.data as CotizacionGeneral[];
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
      id_servicio: this.servicioSelected.id_servicio,
      id_persona: Number(this.formCotizacion.controls.id_persona.value),
      precio_servicio: Number(this.formCotizacion.controls.precio_servicio.value),
      observacion: String(this.formCotizacion.controls.observacion.value),
      costo_total: Number(this.formCotizacion.controls.costo_total.value),
      descuento: Number(this.formCotizacion.controls.descuento.value),
      total_pagar: Number(this.formCotizacion.controls.total_pagar.value),
      user_crea: this.userLogeado.user,
      user_mod: this.userLogeado.user,
    };

    this.cotizacionGeneralService.cotizacionActualizar(data.cod_cotizacion, data).subscribe(result => {
      result as ApiResult;

      if (result.boolean) {
        this.emitResponse = true;
        this.customSuccessToast('Se agregó correctamente!!!');
        this.typeRecive = 'ver';
        this.formCotizacion.controls.observacion.disable();

        this.objCotizacion.fec_emision = data.fec_emision;
        this.objCotizacion.observacion = data.observacion;
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
      id_servicio: this.servicioSelected.id_servicio,
      id_persona: Number(this.formCotizacion.controls.id_persona.value),
      precio_servicio: Number(this.formCotizacion.controls.precio_servicio.value),
      observacion: String(this.formCotizacion.controls.observacion.value),
      costo_total: Number(this.formCotizacion.controls.costo_total.value),
      descuento: Number(this.formCotizacion.controls.descuento.value),
      total_pagar: Number(this.formCotizacion.controls.total_pagar.value),
      user_crea: this.userLogeado.user,
      user_mod: this.userLogeado.user,
    };

    this.cotizacionGeneralService.cotizacionRegistro(data).subscribe(result => {
      result as ApiResult;

      if (result.boolean) {
        this.objCotizacion = result.data[0] as CotizacionGeneral;
        this.agregarSubServicios();
      } else {
        this.customErrorToast(result.message);
        this.isLoading = false;
      }
    });
  }

  agregarSubServicios() {
    let data = [] as CotizacionGeneralSubServicio[];

    for (let i = 0; i < this.dataSubServicios.length; i++) {
      if (this.dataSubServicios[i].boolean) {
        const obj = {
          cod_cotizacion: String(this.formCotizacion.controls.cod_cotizacion.value),
          id_sub_servicio: this.dataSubServicios[i].sub_servicio.id_sub_servicio,
          costo_sub_servicio: this.dataSubServicios[i].sub_servicio.costo_sub_servicio,

          observacion: this.dataSubServicios[i].sub_servicio.observacion,

          user_crea: this.userLogeado.user,
          user_mod: this.userLogeado.user,
        } as CotizacionGeneralSubServicio;

        data.push(obj);
      }
    }

    this.cotizacionGeneralSubServicioService.cotizacionSubServicioAdd(data).subscribe(result => {
      result as ApiResult;

      if (result.boolean) {
        this.emitResponse = true;
        this.isLoading = false;
        this.customSuccessToast('Se agregó correctamente!!!');
        this.typeRecive = 'ver';
      } else {
        this.customErrorToast(result.message);
      }
      this.isLoading = false;
    });
  }

  getCotizacion() {
    this.isLoading = true;
    this.cotizacionGeneralService.cotizacionGet(this.codeRecive).subscribe(result => {
      result as ApiResult;

      if (result.rows > 0) {
        const obj = result.data[0] as CotizacionGeneral;

        this.formCotizacion.controls.cod_cotizacion.setValue(obj.cod_cotizacion);
        this.formCotizacion.controls.fec_solicitud.setValue(obj.fec_solicitud);
        this.formCotizacion.controls.fec_emision.setValue(obj.fec_emision);
        this.formCotizacion.controls.id_servicio.setValue(obj.id_servicio);
        this.formCotizacion.controls.id_persona.setValue(obj.id_persona);
        this.formCotizacion.controls.precio_servicio.setValue(obj.precio_servicio);
        this.formCotizacion.controls.observacion.setValue(obj.observacion);
        this.formCotizacion.controls.costo_total.setValue(obj.costo_total);
        this.formCotizacion.controls.descuento.setValue(obj.descuento);
        this.formCotizacion.controls.total_pagar.setValue(obj.total_pagar);

        this.objCotizacion = obj;

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
        this.getServicio();
      }
    });
  }

  getServicio() {
    this.servicioService.servicioGetByID(Number(this.formCotizacion.controls.id_servicio.value)).subscribe(result => {
      result as ApiResult;

      if (result.boolean) {
        this.servicioSelected = result.data[0] as Servicio;
      }
      this.getSubServiciosCotizacion();
    });
  }

  getSubServiciosCotizacion() {
    this.cotizacionGeneralSubServicioService.cotizacionSubServicioGet(this.codeRecive).subscribe(result => {
      result as ApiResult;

      if (result.rows > 0) {
        for (let i = 0; i < result.data.length; i++) {
          let obj = result.data[i] as CotizacionGeneralSubServicio;


          const newObj = {
            boolean: true,
            sub_servicio: {
              cod_cotizacion: obj.cod_cotizacion,
              id_sub_servicio: obj.id_sub_servicio,
              costo_sub_servicio: obj.costo_sub_servicio,
              observacion: obj.observacion,

              nombre: obj.sub_servicio.nombre,
              descripcion: obj.sub_servicio.descripcion,

              fec_crea: obj.fec_crea,
              user_crea: obj.user_crea,
              fec_mod: obj.fec_mod,
              user_mod: obj.user_mod,
            } as CotizacionGeneralSubServicios
          } as AsSubServicioSelectable;

          this.dataSubServicios.push(newObj);
        }
      }
      this.isLoading = false;
    });
  }

  /** ---------------------------------- Onclick file import ---------------------------------- **/

  /** ---------------------------------------- Receiver --------------------------------------- **/
  busquedaClienteResponse(event: any) {
    if (event === null) {
      if (this.personaC.id_persona === 0) {
        // Si no existe persona -> fin
        this.response.emit(false);
      } else {
        // Solo quita el alert
        this.showBusqueda = false;
      }
    } else {
      // Persona seleccionada
      this.personaC = event as Persona;
      this.formCotizacion.controls.id_persona.setValue(this.personaC.id_persona);

      if (this.personaC.id_empresa === 0) {
        this.empresaC == null;
      } else {
        this.empresaC = this.personaC.id_empresa as Empresa;
      }
      this.showBusqueda = false;
      // Mostrar Servicio Alert
      if (this.servicioSelected.id_servicio === 0) {
        this.showBusquedaServicio = true;
      }
    }
  }

  servicioSelectResponse(event: any) {
    if (event !== null) {
      const element = event as Servicio;
      this.servicioSelected = element;
      this.formCotizacion.controls.id_servicio.setValue(element.id_servicio);
      this.getListaSubServicios(element.id_servicio);
      this.showBusquedaServicio = false;
    } else {
      this.response.emit(false);
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

  inputDescuentoResponse(event: ResponseEvent) {

    switch (this.typeAlertInput) {
      case 'Descuento':
        if (event.bool) {
          this.formCotizacion.controls.descuento.setValue(event.data);
          this.actualizarCostos();
        }
        break;

      case 'Costo':
        if (event.bool) {
          if (Number(event.data) > 0) {
            this.dataSubServicios[this.indexSubServicio].boolean = true;
          } else {
            this.dataSubServicios[this.indexSubServicio].boolean = false;
          }
          this.dataSubServicios[this.indexSubServicio].sub_servicio.costo_sub_servicio = event.data
          this.actualizarCostos();
        }
        break;

      case 'Observación':
        if (event.bool) {
          this.dataSubServicios[this.indexSubServicio].sub_servicio.observacion = event.data;
        }
        break;
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

    let serviciosLista = [];

    for (let i = 0; i < this.dataSubServicios.length; i++) {
      const s = this.dataSubServicios[i];
      if (s.boolean) {
        const data = {
          nombre: s.sub_servicio.nombre,
          descripcion: s.sub_servicio.descripcion,
          observacion: s.sub_servicio.observacion,
          costo: s.sub_servicio.costo_sub_servicio
        }
        serviciosLista.push(data);
      }
    }

    let tableData = [];

    tableData.push(
      [
        { text: 'Nro', style: 'titletable' },
        { text: 'SERVICIO', style: 'titletable' },
        { text: 'DESCRIPCIÓN', style: 'titletable' },
        { text: 'OBSERVACIÓN', style: 'titletable' },
        { text: 'COSTO BS.', style: 'titletable' },
      ]
    );

    if(this.objCotizacion.precio_servicio >0){
      tableData.push(
        [
          { text: 0, style: 'texttable' },
          { text: 'Precio del Servicio', style: 'texttable' },
          { text: '', style: 'texttable' },
          { text: '', style: 'texttable' },
          { text: this.objCotizacion.precio_servicio, style: 'texttable' },
        ]
      );
    }

    for (let i = 0; i < serviciosLista.length; i++) {
      const d = serviciosLista[i];
      // push de muestras
      tableData.push(
        [
          { text: i + 1, style: 'texttable' },
          { text: d.nombre, style: 'texttable' },
          { text: d.descripcion, style: 'texttable' },
          { text: d.observacion, style: 'texttable' },
          { text: d.costo, style: 'texttable' },
        ]
      );
    }

    let servicios = String(this.servicioSelected.nombre);

    pdfCotizacionGeneral(type, this.objCotizacion, this.personaC, servicios, tableData, cuenta);
  }
}
