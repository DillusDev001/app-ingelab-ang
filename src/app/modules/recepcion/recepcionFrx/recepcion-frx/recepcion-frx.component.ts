import { formatDate } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { initFlowbite } from 'flowbite';
import { ApiResult } from 'src/app/shared/interfaces/api/api.result';
import { Persona } from 'src/app/shared/interfaces/app/cliente-module/persona';
import { CotizacionFrx } from 'src/app/shared/interfaces/app/frx-module/cotizacion-frx';
import { MuestraFrx } from 'src/app/shared/interfaces/app/frx-module/muestra-frx';
import { MuestraParametroFrx } from 'src/app/shared/interfaces/app/frx-module/muestra-parametro-frx';
import { Parametro } from 'src/app/shared/interfaces/app/frx-module/parametro';
import { OrdenPago } from 'src/app/shared/interfaces/app/orden.trabajo';
import { Recepcion } from 'src/app/shared/interfaces/app/recepcion';
import { Usuario } from 'src/app/shared/interfaces/app/sesion-module/usuario';
import { DataLocalStorage } from 'src/app/shared/interfaces/local/data-local-storage';
import { PersonaService } from 'src/app/shared/services/cliente-module/persona/persona.service';
import { CotizacionFrxService } from 'src/app/shared/services/frx-module/cotizacion-frx/cotizacion-frx.service';
import { MuestraFrxService } from 'src/app/shared/services/frx-module/muestra-frx/muestra-frx.service';
import { OrdenFrxService } from 'src/app/shared/services/frx-module/orden-frx/orden-frx.service';
import { RecepcionFrxService } from 'src/app/shared/services/frx-module/recepcionFrx/recepcion-frx.service';
import { UsuarioService } from 'src/app/shared/services/sesion-module/usuario/usuario.service';
import { arrayElPago, arrayGastosLogisticos, arrayLaFactura, arrayLugarServicio, arrayMediante, arrayYesNo } from 'src/app/shared/utils/local.array';
import { goLogin } from 'src/app/shared/utils/local.router';
import { deleteLocalStorageData, getLocalDataLogged } from 'src/app/shared/utils/local.storage';
import { pdfOrdenFrx } from 'src/app/shared/utils/pdf/pdf.orden.frx';

@Component({
  selector: 'app-recepcion-frx',
  templateUrl: './recepcion-frx.component.html',
  styleUrls: ['./recepcion-frx.component.css']
})
export class RecepcionFrxComponent {
  /** -------------------------------------- Constructor -------------------------------------- **/
  constructor(
    private router: Router,
    private toast: HotToastService,
    private recepcionFrxService: RecepcionFrxService,
    private ordenFrxService: OrdenFrxService,
    private usuarioService: UsuarioService,
    private cotizacionFrxService: CotizacionFrxService,
    private muestraFrxService: MuestraFrxService,
    private personaService: PersonaService
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

    this.getRecepcion();
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

  // Mensaje Alert
  msgAlert: string = '';

  // ================  ================ //
  formImpresion = new FormGroup({
    desde_fecha: new FormControl('', [Validators.required]),
    hasta_fecha: new FormControl('', [Validators.required]),
    lugar: new FormControl('', [Validators.required]),
    asumido: new FormControl('', [Validators.required]),
    incertidumbre: new FormControl('', [Validators.required]),
    entrega: new FormControl('', [Validators.required]),
    mediante: new FormControl('', [Validators.required]),
    pago: new FormControl('', [Validators.required]),
    pago_hasta: new FormControl('', [Validators.required]),
    factura: new FormControl('', [Validators.required]),
    factura_hasta: new FormControl('', [Validators.required]),
  });

  objRecepcion: Recepcion = {
    cod_cotizacion: '',
    fec_recepcion: '',
    user_recepcion: '',
    observaciones: '',
    user_asignado: '',
    fec_ini: '',
    fec_fin: '',
    estado: 0,
    fec_crea: '',
    user_crea: '',
    fec_mod: '',
    user_mod: ''
  };

  objOrden: OrdenPago = {
    cod_cotizacion: '',
    desde_fecha: '',
    hasta_fecha: '',
    lugar: '',
    asumido: '',
    incertidumbre: '',
    entrega: '',
    mediante: '',
    pago: '',
    pago_hasta: '',
    factura: '',
    factura_hasta: ''
  }

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

  dataMuestras: MuestraFrx[] = []

  objPersona: Persona = {
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

  objTecnicoRecepcion: Usuario = {
    user: '',
    codigo: '',
    nombres: '',
    apellidos: '',
    code: '',
    celular: '',
    telefono: '',
    ci: '',
    exp: '',
    sexo: '',
    est_civil: '',
    fec_nac: '',
    banco: '',
    nro_cuenta: '',
    fec_ingreso: '',
    fec_baja: '',
    rol: '',
    img: '',
    estado: 0,
    fec_crea: '',
    user_mod: '',
    fec_mod: ''
  }

  objTecnicoAsignado: Usuario = {
    user: '',
    codigo: '',
    nombres: '',
    apellidos: '',
    code: '',
    celular: '',
    telefono: '',
    ci: '',
    exp: '',
    sexo: '',
    est_civil: '',
    fec_nac: '',
    banco: '',
    nro_cuenta: '',
    fec_ingreso: '',
    fec_baja: '',
    rol: '',
    img: '',
    estado: 0,
    fec_crea: '',
    user_mod: '',
    fec_mod: ''
  }

  ordenPagoIsSaved: boolean = false;

  typePDF: string = '';

  // ORDEN DE SERVICIO
  dataLugarServicio = arrayLugarServicio;
  dataGastosLogisticos = arrayGastosLogisticos;
  dataMediante = arrayMediante;
  dataElPago = arrayElPago;
  dataLaFactura = arrayLaFactura;
  dataYesNo = arrayYesNo;

  soloTecnico: boolean = false;

  /** ---------------------------------------- Methods ---------------------------------------- **/
  // Para UI vista Fecha
  transformFecha(type: string): string {
    switch (type) {
      case 'Recepcion':
        let r = this.objRecepcion.fec_recepcion
        if (r !== '') {
          return formatDate(r, 'dd/MM/yyyy', 'es');
        } else {
          return '';
        }

      case 'Inicio':
        let i = this.objRecepcion.fec_ini
        if (i !== '') {
          return formatDate(i, 'dd/MM/yyyy', 'es');
        } else {
          return '';
        }

      case 'Fin':
        let f = this.objRecepcion.fec_fin
        if (f !== '') {
          return formatDate(f, 'dd/MM/yyyy', 'es');
        } else {
          return '';
        }

      default: return '';
    }
  }

  setDataFormImpresion() {
    this.formImpresion.controls.desde_fecha.setValue(this.objOrden.desde_fecha);
    this.formImpresion.controls.hasta_fecha.setValue(this.objOrden.hasta_fecha);
    this.formImpresion.controls.lugar.setValue(this.objOrden.lugar);
    this.formImpresion.controls.asumido.setValue(this.objOrden.asumido);
    this.formImpresion.controls.incertidumbre.setValue(this.objOrden.incertidumbre);
    this.formImpresion.controls.entrega.setValue(this.objOrden.entrega);
    this.formImpresion.controls.mediante.setValue(this.objOrden.mediante);
    this.formImpresion.controls.pago.setValue(this.objOrden.pago);
    this.formImpresion.controls.pago_hasta.setValue(this.objOrden.pago_hasta);
    this.formImpresion.controls.factura.setValue(this.objOrden.factura);
    this.formImpresion.controls.factura_hasta.setValue(this.objOrden.factura_hasta);

    this.isLoading = false;
  }

  compareFormulario(): boolean {

    if (this.objOrden.desde_fecha !== String(this.formImpresion.controls.desde_fecha.value)) {
      return false;
    }

    if (this.objOrden.hasta_fecha !== String(this.formImpresion.controls.hasta_fecha.value)) {
      return false;
    }

    if (this.objOrden.lugar !== String(this.formImpresion.controls.lugar.value)) {
      return false;
    }

    if (this.objOrden.asumido !== String(this.formImpresion.controls.asumido.value)) {
      return false;
    }

    if (this.objOrden.incertidumbre !== String(this.formImpresion.controls.incertidumbre.value)) {
      return false;
    }

    if (this.objOrden.entrega !== String(this.formImpresion.controls.entrega.value)) {
      return false;
    }

    if (this.objOrden.mediante !== String(this.formImpresion.controls.mediante.value)) {
      return false;
    }

    if (this.objOrden.pago !== String(this.formImpresion.controls.pago.value)) {
      return false;
    }

    if (this.objOrden.pago_hasta !== String(this.formImpresion.controls.pago_hasta.value)) {
      return false;
    }

    if (this.objOrden.factura !== String(this.formImpresion.controls.factura.value)) {
      return false;
    }

    if (this.objOrden.factura_hasta !== String(this.formImpresion.controls.factura_hasta.value)) {
      return false;
    }

    return true;
  }

  actualizarObjOrdenFrx(data: OrdenPago) {
    this.objOrden = data;
    this.goPDF(data)
  }

  /** ------------------------------------ Methods onClick ------------------------------------ **/
  onClickPDF(type: string) {
    if (this.formImpresion.valid) {
      this.isLoading = true;
      this.typePDF = type;

      const data = {
        cod_cotizacion: this.objRecepcion.cod_cotizacion,
        desde_fecha: String(this.formImpresion.controls.desde_fecha.value),
        hasta_fecha: String(this.formImpresion.controls.hasta_fecha.value),
        lugar: String(this.formImpresion.controls.lugar.value),
        asumido: String(this.formImpresion.controls.asumido.value),
        incertidumbre: String(this.formImpresion.controls.incertidumbre.value),
        entrega: String(this.formImpresion.controls.entrega.value),
        mediante: String(this.formImpresion.controls.mediante.value),
        pago: String(this.formImpresion.controls.pago.value),
        pago_hasta: String(this.formImpresion.controls.pago_hasta.value),
        factura: String(this.formImpresion.controls.factura.value),
        factura_hasta: String(this.formImpresion.controls.factura_hasta.value),
      } as OrdenPago;

      if (!this.ordenPagoIsSaved) {
        this.agregarOrdenFrx(data);
      } else {
        if (!this.compareFormulario()) {
          this.actualizarOrdenFrx(data);
        } else {
          this.goPDF(data);
        }
      }
    }
  }

  onClickCerrar() {
    this.response.emit(false);
  }

  onClickAgregarMiLista() {
    this.isLoading = true;
    const data = {
      user_asignado: this.userLogeado.user,
      fec_ini: formatDate(new Date(), 'yyyy-MM-dd', 'es'),
      user_mod: this.userLogeado.user,
    }

    this.actualizarRecepcionFRX(this.objRecepcion.cod_cotizacion, data);
  }

  /** ----------------------------------- Consultas Sevidor ----------------------------------- **/
  getRecepcion() {
    this.recepcionFrxService.recepcionFrxGetUno(this.codeRecive).subscribe(result => {
      result as ApiResult;

      if (result.boolean) {
        this.objRecepcion = result.data[0] as Recepcion;
        this.objCotizacionFRX = result.data[0]['cotizacion'][0] as CotizacionFrx;
        this.getOrdenPago();
      } else {
        this.customErrorToast(result.message);
        this.isLoading = false;
      }
    });
  }

  getOrdenPago() {
    this.ordenFrxService.ordenFrxGet(this.objRecepcion.cod_cotizacion).subscribe(result => {
      result as ApiResult;

      if (result.boolean) {
        this.objOrden = result.data[0] as OrdenPago;
        this.ordenPagoIsSaved = true;
      }
      this.getTecnicoRecepcion();
    });
  }

  getTecnicoRecepcion() {
    this.usuarioService.usuarioGetUser(this.objRecepcion.user_recepcion).subscribe(result => {
      result as ApiResult;

      if (result.boolean) {
        this.objTecnicoRecepcion = result.data[0] as Usuario;
        this.getTecnicoAsignado();
      } else {
        this.customErrorToast(result.message);
        this.isLoading = false;
      }
    });
  }

  getTecnicoAsignado() {
    this.usuarioService.usuarioGetUser(this.objRecepcion.user_asignado).subscribe(result => {
      result as ApiResult;

      if (result.boolean) {
        this.objTecnicoAsignado = result.data[0] as Usuario;

        if(this.soloTecnico){
          this.isLoading = false
        } else {
          this.getMuestras();
        }
        
      } else {
        this.customErrorToast(result.message);
        this.isLoading = false;
      }
    });
  }

  getMuestras() {
    this.muestraFrxService.muestraGet(this.objCotizacionFRX.cod_cotizacion).subscribe(result => {
      result as ApiResult;

      if (result.boolean) {
        this.dataMuestras = result.data as MuestraFrx[];
        this.getPersona();
      } else {
        this.customErrorToast(result.message);
        this.isLoading = false;
      }
    });
  }

  getPersona() {
    this.personaService.personaBusquedaID(this.objCotizacionFRX.id_persona).subscribe(result => {
      result as ApiResult;

      if (result.boolean) {
        this.objPersona = result.data[0] as Persona;
        if (this.ordenPagoIsSaved) {
          this.setDataFormImpresion();
        } else {
          this.isLoading = false;
        }
      } else {
        this.customErrorToast(result.message);
        this.isLoading = false;
      }
    });
  }

  actualizarRecepcionFRX(cod_cotizacion: string, data: any) {
    this.isLoading = true;
    this.recepcionFrxService.recepcionFrxActualizar(cod_cotizacion, data).subscribe(result => {
      result as ApiResult;

      if (result.boolean) {
        this.objRecepcion.user_asignado = data.user_asignado;
        this.objRecepcion.fec_ini = data.fec_ini;
        this.objRecepcion.user_mod = data.user_mod;

        this.getTecnicoAsignado();
      } else {
        this.customErrorToast(result.message);
        this.isLoading = false;
      }
    });
  }

  // ****************************************************************
  agregarOrdenFrx(data: OrdenPago) {
    this.ordenFrxService.ordenFrxRegistro(data).subscribe(result => {
      result as ApiResult;

      if (result.boolean) {
        this.ordenPagoIsSaved = true;
        this.actualizarObjOrdenFrx(data);
      } else {
        this.customErrorToast(result.message);
        this.isLoading = false;
      }
    });
  }

  actualizarOrdenFrx(data: OrdenPago) {
    this.ordenFrxService.ordenFrxActualizar(this.objRecepcion.cod_cotizacion, data).subscribe(result => {
      result as ApiResult;

      if (result.boolean) {
        this.actualizarObjOrdenFrx(data);
      } else {
        this.customErrorToast(result.message);
        this.isLoading = false;
      }
    });
  }

  /** ---------------------------------- Onclick file import ---------------------------------- **/
  goPDF(data: OrdenPago) {
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

    this.isLoading = false;

    pdfOrdenFrx(this.typePDF, this.objRecepcion, this.objCotizacionFRX, this.objPersona, tableData, data);
  }

  /** ---------------------------------------- Receiver --------------------------------------- **/

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
