import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { initFlowbite } from 'flowbite';
import { ApiResult } from 'src/app/shared/interfaces/api/api.result';
import { Empresa } from 'src/app/shared/interfaces/app/cliente-module/empresa';
import { EmpresaService } from 'src/app/shared/services/cliente-module/empresa/empresa.service';
import { arrayBusquedaEmpresa } from 'src/app/shared/utils/local.array';

@Component({
  selector: 'app-custom-alert-search-empresa',
  templateUrl: './custom-alert-search-empresa.component.html',
  styleUrls: ['./custom-alert-search-empresa.component.css']
})
export class CustomAlertSearchEmpresaComponent {
  /** -------------------------------------- Constructor -------------------------------------- **/
  constructor(
    private router: Router,
    private empresaService: EmpresaService,
    private toast: HotToastService
  ) { }

  /** ---------------------------------------- OnInit ----------------------------------------- **/
  ngOnInit(): void {
    initFlowbite();
  }

  /** ---------------------------------- Variables de Inicio ---------------------------------- **/
  @Output() response: EventEmitter<Empresa | null> = new EventEmitter();

  result!: ApiResult;

  dataBusqueda = arrayBusquedaEmpresa;

  dataResult!: Empresa[];

  isLoading: boolean = false;

  // ================  ================ //
  tableHead: string[] = ['#', 'Razón Social', 'NIT', 'Teléfono', 'Ciudad', 'País'];

  // ================  ================ //
  formBusqueda = new FormGroup({
    busqueda: new FormControl('', [Validators.required]),
    value: new FormControl('', [Validators.required])
  });

  /** ---------------------------------------- Methods ---------------------------------------- **/

  /** ------------------------------------ Methods onClick ------------------------------------ **/
  onClickBuscar() {
    if (this.formBusqueda.valid) {
      this.isLoading = true;

      const attribute = String(this.formBusqueda.controls.busqueda.value);
      const value = String(this.formBusqueda.controls.value.value);

      this.empresaService.empresaBusqueda(attribute, value).subscribe(result => {
        result as ApiResult;

        if (result.boolean) {
          this.dataResult = result.data as Empresa[];
          this.customSuccessToast(result.message);
        } else {
          this.dataResult = [];
          this.customErrorToast(result.message);
        }
        this.isLoading = false;
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
