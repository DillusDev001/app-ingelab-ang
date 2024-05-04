import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { initFlowbite } from 'flowbite';
import { ApiResult } from 'src/app/shared/interfaces/api/api.result';
import { Persona } from 'src/app/shared/interfaces/app/cliente-module/persona';
import { PersonaService } from 'src/app/shared/services/cliente/persona/persona.service';
import { arrayBusquedaPersona } from 'src/app/shared/utils/local.array';

@Component({
  selector: 'app-custom-alert-search',
  templateUrl: './custom-alert-search.component.html',
  styleUrls: ['./custom-alert-search.component.css']
})
export class CustomAlertSearchComponent {

  @Input() type!: string;
  @Output() response: EventEmitter<Persona | null> = new EventEmitter();

  /** -------------------------------------- Constructor -------------------------------------- **/
  constructor(
    private router: Router,
    private personaService: PersonaService,
    private toast: HotToastService
  ) { }

  /** ---------------------------------------- OnInit ----------------------------------------- **/
  ngOnInit(): void {
    initFlowbite();

    switch (this.type) {
      case 'cliente':
        this.tableShow = this.tableHeadCliente;
        this.dataBusqueda = arrayBusquedaPersona;
        break;

      case 'parametro':
        this.tableShow = this.tableHeadCliente;
        this.dataBusqueda = arrayBusquedaPersona;
        break;
    }
  }

  /** ---------------------------------- Variables de Inicio ---------------------------------- **/
  result!: ApiResult;

  dataBusqueda!: any[];

  dataResult!: Persona[];

  // ================  ================ //
  tableHeadCliente: string[] = ['Nombre', 'Celular', 'Email', 'Razón/Empresa', 'NIT'];
  tableHeadParametro: string[] = ['#', 'Parámetro', 'Costo Directo', 'Costo Variable'];

  // ================  ================ //
  formBusqueda = new FormGroup({
    busqueda: new FormControl('', [Validators.required]),
    value: new FormControl('', [Validators.required])
  });

  tableShow: string[] = [];

  /** ---------------------------------------- Methods ---------------------------------------- **/

  /** ------------------------------------ Methods onClick ------------------------------------ **/
  async onClickBuscar() {
    if (this.formBusqueda.valid) {
      const attribute = String(this.formBusqueda.controls.busqueda.value);
      const value = String(this.formBusqueda.controls.value.value);

      this.personaService.personaBusqueda(attribute, value).subscribe(result => {
        result as ApiResult;

        if (result.boolean) {
          this.dataResult = result.data as Persona[];
          this.customSuccessToast(result.message);
        } else {
          this.dataResult = [];
          this.customErrorToast(result.message);
        }
      });
    }
  }

  onClickItem(index: number) {
    this.response.emit(this.dataResult[index]);
  }

  onClickCancel() {
    this.response.emit(null);
  }

  /** ----------------------------------- Consultas Sevidor ----------------------------------- **/

  /** ---------------------------------- Onclick file import ---------------------------------- **/

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
