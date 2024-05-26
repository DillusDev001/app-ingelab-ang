import { formatDate } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { initFlowbite } from 'flowbite';
import { ApiResult } from 'src/app/shared/interfaces/api/api.result';
import { Gasto } from 'src/app/shared/interfaces/app/gastos-module/gasto';
import { GastoDetalle } from 'src/app/shared/interfaces/app/gastos-module/gasto-detalle';
import { Proovedor } from 'src/app/shared/interfaces/app/gastos-module/proovedor';
import { Usuario } from 'src/app/shared/interfaces/app/sesion-module/usuario';
import { ResponseEvent } from 'src/app/shared/interfaces/event/response.event';
import { DataLocalStorage } from 'src/app/shared/interfaces/local/data-local-storage';
import { GastoService } from 'src/app/shared/services/gasto-module/gasto/gasto.service';
import { GastoDetalleService } from 'src/app/shared/services/gasto-module/gastoDetalle/gasto-detalle.service';
import { ProovedorService } from 'src/app/shared/services/gasto-module/proveedor/proovedor.service';
import { ImgServiceService } from 'src/app/shared/utils/img-service/img-service.service';
import { arrayArea, arrayTipoPago, arrayUnidadMedida } from 'src/app/shared/utils/local.array';
import { goLogin } from 'src/app/shared/utils/local.router';
import { deleteLocalStorageData, getLocalDataLogged } from 'src/app/shared/utils/local.storage';
import { pdfGastos } from 'src/app/shared/utils/pdf/gasto.pdf';
import { getCodigoServicioNum } from 'src/app/shared/utils/utils.utils';

@Component({
  selector: 'app-agregar-gastos',
  templateUrl: './agregar-gastos.component.html',
  styleUrls: ['./agregar-gastos.component.css']
})
export class AgregarGastosComponent implements OnInit {

  /** -------------------------------------- Constructor -------------------------------------- **/
  constructor(
    private router: Router,
    private gastoService: GastoService,
    private gastoDetalleService: GastoDetalleService,
    private proovedorService: ProovedorService,
    private toast: HotToastService,
    private imgService: ImgServiceService
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

    this.formGasto.controls.codigo_gasto.disable();

    switch (this.typeRecive) {
      case 'agregar':
        this.showBusqueda = true;
        break;

      case 'ver':
        this.formGastosSetDisable();
        this.isLoading = true;
        this.formGasto.controls.codigo_gasto.setValue(this.codeRecive);
        this.getGasto();
        break
    }
  }

  /** ---------------------------------- Variables de Inicio ---------------------------------- **/
  @Input() typeRecive!: string;
  @Input() codeRecive!: string; // Codigo Gasto

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

  // ================  ================ //
  formGasto = new FormGroup({
    codigo_gasto: new FormControl('s', [Validators.required]),
    version: new FormControl('2', [Validators.required]),
    fec_vigencia: new FormControl('', [Validators.required]), //********
    registro: new FormControl('', [Validators.required]),
    tipo_gasto: new FormControl('Compra', [Validators.required]),
    area: new FormControl('', [Validators.required]),
    fec_emision: new FormControl('', [Validators.required]), //********
    id_proveedor: new FormControl(0, [Validators.required]),
    tipo_cambio: new FormControl(6.96, [Validators.required]),
    tipo_pago: new FormControl('', [Validators.required]),
    tiempo_credito: new FormControl('', [Validators.required]),
    descripcion: new FormControl('', [Validators.required]),
    fec_entrega: new FormControl('', [Validators.required]), //********
    sub_total: new FormControl(0, [Validators.required]),
    descuento: new FormControl(0, [Validators.required]),
    total_bs: new FormControl(0, [Validators.required]),
    total_sus: new FormControl(0, [Validators.required]),
  });

  formAddDetalle = new FormGroup({
    descripcion: new FormControl('', [Validators.required]),
    cantidad: new FormControl(0, [Validators.required]),
    unidad_medida: new FormControl('', [Validators.required]),
    precio_unidad: new FormControl(0, [Validators.required]),
    precio_total: new FormControl(0, [Validators.required]),
  });

  typeDatePicker: string = ''; // Solicitud - Emision

  fechaNow: string = formatDate(new Date(), 'dd/MM/yyyy', 'es');

  showBusqueda: boolean = false;
  showDatePicker: boolean = false;
  showAlertDescuento: boolean = false;

  labelDatePicker: string = ''; // Label de Datapicker
  fechaSendDatePicker: string = '';

  gastoObj: Gasto = {
    codigo_gasto: '',
    version: '',
    fec_vigencia: '',
    registro: '',
    tipo_gasto: '',
    area: '',
    fec_emision: '',
    id_proveedor: 0,
    proveedor: {
      id_proveedor: 0,
      razon: '',
      nit: '',
      banco: '',
      nro_cuenta: '',
      beneficiario: '',
      moneda: '',
      fec_crea: '',
      user_crea: '',
      fec_mod: '',
      user_mod: ''
    },
    detalle: [],
    tipo_cambio: 0,
    tipo_pago: '',
    tiempo_credito: '',
    descripcion: '',
    fec_entrega: '',
    sub_total: 0,
    descuento: 0,
    total_bs: 0,
    total_sus: 0,
    fec_crea: '',
    user_crea: '',
    fec_mod: '',
    user_mod: ''
  };

  dataArea = arrayArea;

  dataTipoPago = arrayTipoPago;

  dataUnidadMedida = arrayUnidadMedida;

  emitResponse: boolean = false;


  /** ---------------------------------------- Methods ---------------------------------------- **/
  generarCodGasto(sec: string) {
    const area = String(this.formGasto.controls.area.value);
    this.formGasto.controls.codigo_gasto.setValue('INGLAB-ADM-CONT-' + area + '-' + sec);
  }

  generatedFechaSolicitudHoy(): string {
    return formatDate(new Date(), 'yyyy-MM-dd', 'es');
  }

  // Para UI vista Fecha
  transformFecha(type: string): string {
    switch (type) {
      case 'Vigencia':
        let s = String(this.formGasto.controls.fec_vigencia.value)
        if (s !== '') {
          return formatDate(s, 'dd/MM/yyyy', 'es');
        } else {
          return '';
        }

      case 'Emision':
        let em = String(this.formGasto.controls.fec_emision.value)
        if (em !== '') {
          return formatDate(em, 'dd/MM/yyyy', 'es');
        } else {
          return '';
        }

      case 'Entrega':
        let et = String(this.formGasto.controls.fec_entrega.value)
        if (et !== '') {
          return formatDate(et, 'dd/MM/yyyy', 'es');
        } else {
          return '';
        }

      default: return '';
    }
  }

  transformCostos(type: string): string {
    switch (type) {
      case 'Sub Total':
        return String(this.formGasto.controls.sub_total.value);

      case 'Descuento':
        return String(this.formGasto.controls.descuento.value);

      case 'Total Bs':
        return String(this.formGasto.controls.total_bs.value);

      case 'Total Sus':
        return String(this.formGasto.controls.total_sus.value);


      default: return '';
    }
  }

  actualizarCostos() {
    let suma = 0;
    for (let i = 0; i < this.gastoObj.detalle.length; i++) {
      suma += this.gastoObj.detalle[i].precio_total;
    }

    if (suma > 0) {
      const tipoC = Number(this.formGasto.controls.tipo_cambio.value);

      this.formGasto.controls.sub_total.setValue(suma);
      const desc = Number(this.formGasto.controls.descuento.value);
      const t_bs = suma - desc;
      this.formGasto.controls.total_bs.setValue(t_bs);
      this.formGasto.controls.total_sus.setValue(t_bs / tipoC);
    } else {
      this.formGasto.controls.sub_total.setValue(suma);
      this.formGasto.controls.total_bs.setValue(0);
      this.formGasto.controls.total_sus.setValue(0);
    }


  }

  limpiarFormAddDetalle() {
    this.formAddDetalle.controls.descripcion.setValue('');
    this.formAddDetalle.controls.cantidad.setValue(0);
    this.formAddDetalle.controls.unidad_medida.setValue('');
    this.formAddDetalle.controls.precio_unidad.setValue(0);
    this.formAddDetalle.controls.precio_total.setValue(0);
  }

  precioAddItem() {
    const cantidad = Number(this.formAddDetalle.controls.cantidad.value);
    const precio = Number(this.formAddDetalle.controls.precio_unidad.value);

    this.formAddDetalle.controls.precio_total.setValue(cantidad * precio);
  }

  formGastoSetEnable() {
    //this.formGasto.controls.codigo_gasto.enable();
    this.formGasto.controls.version.enable();
    this.formGasto.controls.fec_vigencia.enable();
    this.formGasto.controls.registro.enable();
    this.formGasto.controls.tipo_gasto.enable();
    this.formGasto.controls.area.enable();
    this.formGasto.controls.fec_emision.enable();
    this.formGasto.controls.id_proveedor.enable();
    this.formGasto.controls.tipo_cambio.enable();
    this.formGasto.controls.tipo_pago.enable();
    this.formGasto.controls.tiempo_credito.enable();
    this.formGasto.controls.descripcion.enable();
    this.formGasto.controls.fec_entrega.enable();
    this.formGasto.controls.sub_total.enable();
    this.formGasto.controls.descuento.enable();
    this.formGasto.controls.total_bs.enable();
    this.formGasto.controls.total_sus.enable();
  }

  formGastosSetDisable() {
    //this.formGasto.controls.codigo_gasto.disable();
    this.formGasto.controls.version.disable();
    this.formGasto.controls.fec_vigencia.disable();
    this.formGasto.controls.registro.disable();
    this.formGasto.controls.tipo_gasto.disable();
    this.formGasto.controls.area.disable();
    this.formGasto.controls.fec_emision.disable();
    this.formGasto.controls.id_proveedor.disable();
    this.formGasto.controls.tipo_cambio.disable();
    this.formGasto.controls.tipo_pago.disable();
    this.formGasto.controls.tiempo_credito.disable();
    this.formGasto.controls.descripcion.disable();
    this.formGasto.controls.fec_entrega.disable();
    this.formGasto.controls.sub_total.disable();
    this.formGasto.controls.descuento.disable();
    this.formGasto.controls.total_bs.disable();
    this.formGasto.controls.total_sus.disable();
  }

  /** ------------------------------------ Methods onClick ------------------------------------ **/
  onClickShowFechaSelect(type: string, label: string) {
    if (this.typeRecive !== 'ver') {
      this.typeDatePicker = type;
      this.labelDatePicker = label;

      switch (type) {
        case 'Vigencia':
          this.fechaSendDatePicker = String(this.formGasto.controls.fec_vigencia.value);
          break;

        case 'Emision':
          this.fechaSendDatePicker = String(this.formGasto.controls.fec_emision.value);
          break;

        case 'Entrega':
          this.fechaSendDatePicker = String(this.formGasto.controls.fec_entrega.value);
          break;
      }
      this.showDatePicker = true;
    }
  }

  onClickBusquedaProveedor() {
    this.showBusqueda = true;
  }

  onClickAddDetalle() {
    if (this.formAddDetalle.valid) {
      const data = {
        codigo_gasto: '',
        //sec: this.gastoObj.detalle.length === 0 ? 1 : this.gastoObj.detalle[this.gastoObj.detalle.length - 1].sec + 1,
        sec: 0,
        descripcion: String(this.formAddDetalle.controls.descripcion.value),
        cantidad: Number(this.formAddDetalle.controls.cantidad.value),
        unidad_medida: String(this.formAddDetalle.controls.unidad_medida.value),
        precio_unidad: Number(this.formAddDetalle.controls.precio_unidad.value),
        precio_total: Number(this.formAddDetalle.controls.precio_total.value),

        fec_crea: '',
        user_crea: this.userLogeado.user,
        fec_mod: '',
        user_mod: this.userLogeado.user,
      } as GastoDetalle

      this.gastoObj.detalle.push(data);
      this.limpiarFormAddDetalle();
      this.actualizarCostos();
    } else {
      this.customErrorToast('Campos de detalle necesarios.')
    }
  }

  onClickDescuento() {
    if (this.typeRecive === 'agregar') {
      this.showAlertDescuento = true;
    }
  }

  onClickAgregarGasto() {
    if (this.formGasto.valid) {
      this.isLoading = true;
      if (this.typeRecive === 'agregar') {
        this.agregarGasto();
      } else {
        //this.editarCotizacion();
      }
    }
  }

  onClickCancel() {
    this.response.emit(this.emitResponse);
  }

  onChange(event: any) {
    this.precioAddItem();
  }

  onClickEliminarItem(index: number) {
    this.gastoObj.detalle.splice(index, 1);
    this.actualizarCostos();
  }

  onClickPDF(type: string) {
    const imageUrl = 'assets/images/logo.png';
    this.imgService.getImageBase64(imageUrl).subscribe(base64 => {
      pdfGastos(type, this.gastoObj, base64);
    });
  }

  /** ----------------------------------- Consultas Sevidor ----------------------------------- **/
  getLastCode(area: string) {
    this.gastoService.findLastCode(area).subscribe(result => {
      result as ApiResult;

      if (result.boolean) {
        const d = result.data as Gasto[];
        const lastcCodigo = d[d.length - 1].codigo_gasto;
        this.generarCodGasto(getCodigoServicioNum(lastcCodigo));
      } else {
        this.generarCodGasto('0001');
      }
      this.isLoading = false;
    });
  }

  getGasto() {
    this.gastoService.gastoGet(this.codeRecive).subscribe(result => {
      result as ApiResult;

      if (result.rows === 1) {
        this.gastoObj = result.data[0] as Gasto;

        this.formGasto.controls.codigo_gasto.setValue(this.gastoObj.codigo_gasto);
        this.formGasto.controls.version.setValue(this.gastoObj.version);
        this.formGasto.controls.fec_vigencia.setValue(this.gastoObj.fec_vigencia);
        this.formGasto.controls.registro.setValue(this.gastoObj.registro);
        this.formGasto.controls.tipo_gasto.setValue(this.gastoObj.tipo_gasto);
        this.formGasto.controls.area.setValue(this.gastoObj.area);
        this.formGasto.controls.fec_emision.setValue(this.gastoObj.fec_emision);
        this.formGasto.controls.id_proveedor.setValue(this.gastoObj.id_proveedor);
        this.formGasto.controls.tipo_cambio.setValue(this.gastoObj.tipo_cambio);
        this.formGasto.controls.tipo_pago.setValue(this.gastoObj.tipo_pago);
        this.formGasto.controls.tiempo_credito.setValue(this.gastoObj.tiempo_credito);
        this.formGasto.controls.descripcion.setValue(this.gastoObj.descripcion);
        this.formGasto.controls.fec_entrega.setValue(this.gastoObj.fec_entrega);
        this.formGasto.controls.sub_total.setValue(this.gastoObj.sub_total);
        this.formGasto.controls.descuento.setValue(this.gastoObj.descuento);
        this.formGasto.controls.total_bs.setValue(this.gastoObj.total_bs);
        this.formGasto.controls.total_sus.setValue(this.gastoObj.total_sus);

      } else {
        this.customErrorToast(result.message);
        this.response.emit(false);
      }
      this.isLoading = false;
    });
  }

  agregarGasto() {
    const data = {
      codigo_gasto: this.formGasto.controls.codigo_gasto.value,
      version: this.formGasto.controls.version.value,
      fec_vigencia: this.formGasto.controls.fec_vigencia.value,
      registro: this.formGasto.controls.registro.value,
      tipo_gasto: this.formGasto.controls.tipo_gasto.value,
      area: this.formGasto.controls.area.value,
      fec_emision: this.formGasto.controls.fec_emision.value,
      id_proveedor: this.formGasto.controls.id_proveedor.value,
      tipo_cambio: this.formGasto.controls.tipo_cambio.value,
      tipo_pago: this.formGasto.controls.tipo_pago.value,
      tiempo_credito: this.formGasto.controls.tiempo_credito.value,
      descripcion: this.formGasto.controls.descripcion.value,
      fec_entrega: this.formGasto.controls.fec_entrega.value,
      sub_total: this.formGasto.controls.sub_total.value,
      descuento: this.formGasto.controls.descuento.value,
      total_bs: this.formGasto.controls.total_bs.value,
      total_sus: this.formGasto.controls.total_sus.value,

      user_crea: this.userLogeado.user,
      user_mod: this.userLogeado.user,
    } as Gasto;

    this.gastoService.gastoRegistro(data).subscribe(result => {
      result as ApiResult;

      if (result.boolean) {

        this.gastoObj.codigo_gasto = data.codigo_gasto;
        this.gastoObj.version = data.version;
        this.gastoObj.fec_vigencia = data.fec_vigencia;
        this.gastoObj.registro = data.registro;
        this.gastoObj.tipo_gasto = data.tipo_gasto;
        this.gastoObj.area = data.area;
        this.gastoObj.fec_emision = data.fec_emision;
        this.gastoObj.id_proveedor = data.id_proveedor;
        this.gastoObj.tipo_cambio = data.tipo_cambio;
        this.gastoObj.tipo_pago = data.tipo_pago;
        this.gastoObj.tiempo_credito = data.tiempo_credito;
        this.gastoObj.descripcion = data.descripcion;
        this.gastoObj.fec_entrega = data.fec_entrega;
        this.gastoObj.sub_total = data.sub_total;
        this.gastoObj.descuento = data.descuento;
        this.gastoObj.total_bs = data.total_bs;
        this.gastoObj.total_sus = data.total_sus;


        this.agregarGastoDetalle();
      } else {
        this.customErrorToast(result.message);
        this.isLoading = false;
      }
    });
  }

  agregarGastoDetalle() {
    const codG = String(this.formGasto.controls.codigo_gasto.value)
    const data = [];

    const array = this.gastoObj.detalle as GastoDetalle[];

    for (let i = 0; i < array.length; i++) {
      const x = array[i] as GastoDetalle;
      const obj = {
        codigo_gasto: codG,
        sec: i + 1,
        descripcion: x.descripcion,
        cantidad: x.cantidad,
        unidad_medida: x.unidad_medida,
        precio_unidad: x.precio_unidad,
        precio_total: x.precio_total,

        user_crea: this.userLogeado.user,
        user_mod: this.userLogeado.user,
      };
      data.push(obj);
    }

    this.gastoDetalleService.gastoDetalleAdd(data).subscribe(result => {
      result as ApiResult;

      if (result.boolean) {
        this.customSuccessToast(result.message);
        this.emitResponse = true;
        this.typeRecive = 'ver';
        this.formGastosSetDisable();
      } else {
        this.customErrorToast(result.message);
      }
      this.isLoading = false;
    });

  }

  /** ---------------------------------- Onclick file import ---------------------------------- **/

  /** ---------------------------------------- Receiver --------------------------------------- **/
  inputDescuentoResponse(event: ResponseEvent) {
    if (event.bool) {
      this.formGasto.controls.descuento.setValue(event.data);
      this.actualizarCostos();
    }
    this.showAlertDescuento = false;
  }

  busquedaProveedorResponse(event: any) {
    if (event === null) {
      if (this.gastoObj.proveedor.id_proveedor === 0) {
        // Si no existe persona -> fin
        this.response.emit(false);
      } else {
        // Solo quita el alert
        this.showBusqueda = false;
      }
    } else {
      // Persona seleccionada
      this.gastoObj.proveedor = event as Proovedor;
      this.formGasto.controls.id_proveedor.setValue(this.gastoObj.proveedor.id_proveedor);

      this.showBusqueda = false;
    }
  }

  fechaSelectResponse(value: string) {
    switch (this.typeDatePicker) {
      case 'Vigencia':
        this.formGasto.controls.fec_vigencia.setValue(value);
        break;

      case 'Emision':
        this.formGasto.controls.fec_emision.setValue(value);
        break;

      case 'Entrega':
        this.formGasto.controls.fec_entrega.setValue(value);
        break;
    }
    this.showDatePicker = false;
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

  onChangeArea(event: any) {
    const area = String(event.target.value);

    if (area !== '') {
      this.isLoading = true;
      this.getLastCode(area);
    } else {
      this.formGasto.controls.codigo_gasto.setValue('');
    }
  }
}
