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
import { PersonaService } from 'src/app/shared/services/cliente/persona/persona.service';
import { CotizacionGeneralSubServicioService } from 'src/app/shared/services/servicio-generale-module/cotizacion-general-sub-servicio/cotizacion-general-sub-servicio.service';
import { CotizacionGeneralService } from 'src/app/shared/services/servicio-generale-module/cotizacion-general/cotizacion-general.service';
import { SubServicioService } from 'src/app/shared/services/sub-servicio/sub-servicio.service';
import { UsuarioService } from 'src/app/shared/services/usuario/usuario.service';
import { goLogin } from 'src/app/shared/utils/local.router';
import { deleteLocalStorageData, getLocalDataLogged } from 'src/app/shared/utils/local.storage';
import { getCodigoServicioNum } from 'src/app/shared/utils/utils.utils';

import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { Margins, Alignment, PageSize, PageOrientation } from 'pdfmake/interfaces';
import { style } from '@angular/animations';

(<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-cotizacion',
  templateUrl: './cotizacion.component.html',
  styleUrls: ['./cotizacion.component.css']
})
export class CotizacionComponent implements OnInit {
  /** -------------------------------------- Constructor -------------------------------------- **/
  constructor(
    private router: Router,
    private subServicioService: SubServicioService,
    private cotizacionGeneralService: CotizacionGeneralService,
    private cotizacionGeneralSubServicioService: CotizacionGeneralSubServicioService,
    private personaService: PersonaService,
    private usuarioService: UsuarioService,
    private toast: HotToastService
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
  // ================  ================ //
  _ID_TIPO_SERVICIO: number = 1; // General
  servicioSelected: Servicio | null = null;
  _ID_SERVICIO: number = 1; // FRX

  tecnicoUser!: Usuario;

  formCotizacion = new FormGroup({
    cod_cotizacion: new FormControl('', [Validators.required]),
    fec_solicitud: new FormControl(this.generatedFechaSolicitudHoy(), [Validators.required]), // 'yyyy-MM-dd'
    fec_emision: new FormControl(''), // 'yyyy-MM-dd'
    id_servicio: new FormControl(0, [Validators.required]),
    id_persona: new FormControl(0, [Validators.required]),
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
        suma += this.dataSubServicios[i].sub_servicio.costo_directo;
      }
    }

    this.formCotizacion.controls.total_pagar.setValue(suma);
    const desc = Number(this.formCotizacion.controls.descuento.value);
    this.formCotizacion.controls.costo_total.setValue(suma - ((suma * desc) / 100));

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

  setValueCheckBox(index: number, value: boolean) {
    this.dataSubServicios[index].boolean = !value;

    this.actualizarCostos();
  }


  onClickDescuento() {
    if (this.typeRecive === 'agregar') {
      this.showAlertDescuento = true;
    }
  }


  // ============= OnClick Guardar Cotizacion =============\\
  onClickAgregarCotizacion() {
    if (this.typeRecive === 'agregar') {
      this.agregarCotizacion();
    } else {
      this.editarCotizacion();
    }
  }

  onClickCancel() {
    this.response.emit(false);
  }

  onClickPDF(type: string) {
    if (this.empresaC.id_empresa !== 0) {
      this.createPDF_Empresa(type);
    } else {
      //this.createPDF_Persona();
    }
  }

  /** ----------------------------------- Consultas Sevidor ----------------------------------- **/
  getListaSubServicios(id_servicio: number) {
    this.subServicioService.subServicioGetLista(id_servicio).subscribe(result => {
      result as ApiResult;

      if (result.boolean) {
        let suma = 0;
        for (let i = 0; i < result.data.length; i++) {
          const subServicio = result.data[i] as SubServicio;

          const newObj = {
            boolean: true,
            sub_servicio: subServicio
          }
          this.dataSubServicios.push(newObj);

          suma += subServicio.costo_directo;
        }

        this.formCotizacion.controls.total_pagar.setValue(suma);
        const desc = Number(this.formCotizacion.controls.descuento.value);
        this.formCotizacion.controls.costo_total.setValue(suma - ((suma * desc) / 100));

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
      id_servicio: this._ID_SERVICIO,
      id_persona: Number(this.formCotizacion.controls.id_persona.value),
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
        this.response.emit(true);
      } else {
        this.customErrorToast(result.message);
      }
    });
  }

  agregarCotizacion() {
    const data = {
      cod_cotizacion: String(this.formCotizacion.controls.cod_cotizacion.value),
      fec_solicitud: String(this.formCotizacion.controls.fec_solicitud.value),
      fec_emision: String(this.formCotizacion.controls.fec_emision.value),
      id_servicio: this.servicioSelected?.id_servicio,
      id_persona: Number(this.formCotizacion.controls.id_persona.value),
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
        this.agregarSubServicios();
      } else {
        this.customErrorToast(result.message);
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
          costo_sub_servicio: this.dataSubServicios[i].sub_servicio.costo_directo,

          user_crea: this.userLogeado.user,
          user_mod: this.userLogeado.user,
        } as CotizacionGeneralSubServicio;

        data.push(obj);
      }
    }

    this.cotizacionGeneralSubServicioService.cotizacionSubServicioAdd(data).subscribe(result => {
      result as ApiResult;

      if (result.boolean) {
        this.response.emit(true);
      } else {
        this.customErrorToast(result.message);
      }
    });
  }

  getCotizacion() {
    this.cotizacionGeneralService.cotizacionGet(this.codeRecive).subscribe(result => {
      result as ApiResult;

      if (result.rows > 0) {
        const obj = result.data[0] as CotizacionGeneral;

        this.formCotizacion.controls.cod_cotizacion.setValue(obj.cod_cotizacion);
        this.formCotizacion.controls.fec_solicitud.setValue(obj.fec_solicitud);
        this.formCotizacion.controls.fec_emision.setValue(obj.fec_emision);
        this.formCotizacion.controls.id_servicio.setValue(obj.id_servicio);
        this.formCotizacion.controls.id_persona.setValue(obj.id_persona);
        this.formCotizacion.controls.observacion.setValue(obj.observacion);
        this.formCotizacion.controls.costo_total.setValue(obj.costo_total);
        this.formCotizacion.controls.descuento.setValue(obj.descuento);
        this.formCotizacion.controls.total_pagar.setValue(obj.total_pagar);

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

        this.getSubServicios();
      }
    });
  }

  getSubServicios() {
    this.cotizacionGeneralSubServicioService.cotizacionSubServicioGet(this.codeRecive).subscribe(result => {
      result as ApiResult;

      if (result.rows > 0) {
        for (let i = 0; i < result.data.length; i++) {
          const obj = result.data[i] as CotizacionGeneralSubServicio;

          const newObj = {
            boolean: true,
            sub_servicio: obj.sub_servicio as SubServicio
          } as AsSubServicioSelectable;

          this.dataSubServicios.push(newObj);
        }
      }
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
      if (this.servicioSelected === null) {
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

  createPDF_Empresa(type: string) {

    const color_gray_50 = '#f8fafc';
    const color_info_50 = '#f0f7fe';
    const color_primary_50 = '#f0fafb';
    const color_primary_500 = '#3494a6';
    const color_primary_800 = '#2b535f';

    let tableData = [];

    let borderColor = [color_primary_800, color_primary_800, color_primary_800, color_primary_800];


    tableData.push(
      [
        { text: '#', style: 'cellHeader', borderColor: borderColor },
        { text: 'Nombre', style: 'cellHeader', borderColor: borderColor },
        { text: 'Descripción', style: 'cellHeader', borderColor: borderColor },
        { text: 'Costo', style: 'cellHeader', borderColor: borderColor },
      ]
    );

    for (let i = 0; i < this.dataSubServicios.length; i++) {
      const d = this.dataSubServicios[i];
      // push de muestras
      tableData.push(
        [
          { text: i + 1, style: 'cellContent' },
          { text: d.sub_servicio.nombre, style: 'cellContent' },
          { text: d.sub_servicio.descripcion, style: 'cellContent' },
          { text: "Bs. " + d.sub_servicio.costo_directo, style: 'cellContent' },
        ]
      );
    }



    var pdfCreation = {
      pageSize: 'LETTER' as PageSize,
      //pageOrientation: 'landscape' as PageOrientation,
      //pageMargins: [5, 5, 5, 5] as Margins,
      content: [

        // Titulo
        {
          margin: [0, 0, 0, 15] as Margins,
          columns: [
            { qr: String(this.formCotizacion.controls.cod_cotizacion.value), foreground: color_primary_800, fit: 100 },
            {
              width: 'auto',
              margin: [0, 0, 0, 15] as Margins,
              text: 'COTIZACIÓN FRX',
              style: 'header',
              alignment: 'center' as Alignment,
              color: color_primary_500
            },
            {
              width: '*',
              text: ''
            }
          ]
        },
        // Codigo cotizacion y area
        {
          columns: [
            {
              margin: [0, 0, 0, 10] as Margins,
              text: [
                { text: 'Código cotización: ', color: color_primary_800 },
                { text: String(this.formCotizacion.controls.cod_cotizacion.value), bold: true, color: color_primary_800 },
              ],
            },
            {
              width: 'auto',
              text: [
                { text: 'Área: ' },
                { text: 'Laboratorio FRX', bold: true }
              ],
              color: color_primary_800, alignment: 'right' as Alignment
            }
          ]
        },
        // Fechas
        {
          text: [
            { text: 'Fecha solitud: ', color: color_primary_800, margin: [0, 0, 0, 5] as Margins, },
            { text: this.convertDate(String(this.formCotizacion.controls.fec_solicitud.value)), color: color_primary_800, bold: true },
            '\n',
            { text: 'Fecha emisión: ', color: color_primary_800 },
            { text: this.convertDate(String(this.formCotizacion.controls.fec_emision.value)), color: color_primary_800, bold: true },
          ]
        },
        // Tecnico
        {
          columns: [
            { text: 'Técnico', margin: [0, 15, 0, 2] as Margins, bold: true, color: color_primary_800 }
          ]
        },
        {
          columns: [
            {
              margin: [0, 0, 0, 10] as Margins,
              table: {
                widths: ['*', 'auto', '*'],
                body: [
                  [
                    { text: [{ text: 'Nombre: ' }, { text: this.userLogeado.nombres + ' ' + this.userLogeado.apellidos, bold: true }], color: color_primary_800, margin: [2, 2, 2, 2] as Margins },
                    { text: [{ text: 'Celualr: ' }, { text: this.userLogeado.celular, bold: true }], color: color_primary_800, margin: [2, 2, 2, 2] as Margins },
                    { text: [{ text: 'Rol: ' }, { text: this.userLogeado.rol, bold: true }], color: color_primary_800, margin: [2, 2, 2, 2] as Margins }
                  ],
                ],
              }
            }
          ]
        },
        // Cliente
        {
          columns: [
            { text: 'Cliente', margin: [0, 0, 0, 2] as Margins, bold: true, color: color_primary_800 },
            { text: 'Empresa', margin: [7.5, 0, 0, 2] as Margins, bold: true, color: color_primary_800 }
          ]
        },
        {
          columns: [
            {
              margin: [0, 0, 7.5, 0] as Margins,
              table: {
                widths: ['*'],
                body: [
                  [{ text: [{ text: 'Persona: ' }, { text: this.personaC.nombre_persona, bold: true }], color: color_primary_800, margin: [2, 2, 2, 2] as Margins }],
                  [{ text: [{ text: 'Celular: ' }, { text: this.personaC.celular, bold: true }], color: color_primary_800, margin: [2, 2, 2, 2] as Margins }],
                  [{ text: [{ text: 'Email: ' }, { text: this.personaC.email, bold: true }], color: color_primary_800, margin: [2, 2, 2, 2] as Margins }],
                  [{ text: [{ text: 'Teléfono: ' }, { text: this.empresaC.telefono, bold: true }], color: color_primary_800, margin: [2, 2, 2, 2] as Margins }],
                ],
              }
            },
            {
              margin: [7.5, 0, 0, 10] as Margins,
              table: {
                widths: ['*'],
                body: [
                  [{ text: [{ text: 'Empresa: ' }, { text: this.empresaC.razon_social, bold: true }], color: color_primary_800, margin: [2, 2, 2, 2] as Margins }],
                  [{ text: [{ text: 'NIT: ' }, { text: this.empresaC.nit, bold: true }], color: color_primary_800, margin: [2, 2, 2, 2] as Margins }],
                  [{ text: [{ text: 'Ciudad: ' }, { text: this.empresaC.ciudad, bold: true }], color: color_primary_800, margin: [2, 2, 2, 2] as Margins }],
                  [{ text: [{ text: 'País: ' }, { text: this.empresaC.pais, bold: true }], color: color_primary_800, margin: [2, 2, 2, 2] as Margins }],
                ],
              }
            }
          ]
        },
        // Detalle
        {
          text: 'DETALLE', alignment: 'center' as Alignment, bold: true, color: color_primary_800, margin: [0, 0, 0, 2] as Margins
        },
        {
          table: {
            fontSize: 8,
            margin: [0, 0, 0, 0] as Margins,
            widths: ['auto', '*', '*', 'auto'],
            body: tableData
          },
          layout: 'lightHorizontalLines'
        },
        // Costos
        {
          columns: [
            {
              margin: [0, 0, 0, 10] as Margins,
              text: [
                { text: '' }
              ],
            },
            {
              margin: [0, 15, 0, 0] as Margins,
              width: 'auto',
              table: {
                widths: ['auto', 'auto', '*'],
                body: [
                  [
                    {
                      borderColor: borderColor,
                      border: [true, true, false, true],
                      margin: [7, 2, 7, 2] as Margins,
                      alignment: 'left',
                      bold: true,
                      text: 'Total a Pagar'
                    },
                    {
                      borderColor: borderColor,
                      border: [false, true, false, true],
                      margin: [7, 2, 7, 2] as Margins,
                      alignment: 'left',
                      bold: true,
                      text: ':'
                    },
                    {
                      borderColor: borderColor,
                      border: [false, true, true, true],
                      margin: [7, 2, 7, 2] as Margins,
                      alignment: 'right',
                      text: 'Bs. ' + String(this.formCotizacion.controls.total_pagar.value)
                    }
                  ],
                  [
                    {
                      borderColor: borderColor,
                      border: [true, true, false, true],
                      margin: [7, 2, 7, 2] as Margins,
                      alignment: 'left',
                      bold: true,
                      text: 'Descuento'
                    },
                    {
                      borderColor: borderColor,
                      border: [false, true, false, true],
                      margin: [7, 2, 7, 2] as Margins,
                      alignment: 'left',
                      bold: true,
                      text: ':'
                    },
                    {
                      borderColor: borderColor,
                      border: [false, true, true, true],
                      margin: [7, 2, 7, 2] as Margins,
                      alignment: 'right',
                      text: String(this.formCotizacion.controls.descuento.value) + ' %'
                    }
                  ],
                  [
                    {
                      borderColor: borderColor,
                      border: [true, true, false, true],
                      margin: [7, 2, 7, 2] as Margins,
                      alignment: 'left',
                      bold: true,
                      text: 'Costo Total'
                    },
                    {
                      borderColor: borderColor,
                      border: [false, true, false, true],
                      margin: [7, 2, 7, 2] as Margins,
                      alignment: 'left',
                      bold: true,
                      text: ':'
                    },
                    {
                      borderColor: borderColor,
                      border: [false, true, true, true],
                      margin: [7, 2, 7, 2] as Margins,
                      alignment: 'right',
                      text: 'Bs. ' + String(this.formCotizacion.controls.costo_total.value)
                    }
                  ],
                ]
              },
              color: color_primary_800, alignment: 'right' as Alignment
            }
          ]
        },


      ],
      styles: {
        header: {
          fontSize: 36,
          bold: true,
          alignment: 'center' as Alignment
        },
        cellHeader: {
          bold: true,
          alignment: 'center' as Alignment,
          color: color_primary_800,
          fillColor: color_primary_50,
        },
        cellDetalleHeader: {
          bold: true,
          alignment: 'center' as Alignment,
          color: color_primary_800,
          fillColor: color_info_50,
        },
        cellContent: {
          bold: true,
          alignment: 'center' as Alignment,
          color: color_primary_800,
          fillColor: color_gray_50,
        },
      }
    }

    if (type === 'descargar') {
      pdfMake.createPdf(pdfCreation).download(String(this.formCotizacion.controls.cod_cotizacion.value) + '.pdf');
    } else {
      pdfMake.createPdf(pdfCreation).open();
    }

  }
}
