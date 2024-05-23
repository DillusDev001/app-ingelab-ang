import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { initFlowbite } from 'flowbite';
import { SubServicio } from 'src/app/shared/interfaces/app/servicio-module/sub-servicio';
import { letraCapital, letraCapitalInicial } from 'src/app/shared/utils/utils.utils';

@Component({
  selector: 'app-custom-add-sub-servicio',
  templateUrl: './custom-add-sub-servicio.component.html',
  styleUrls: ['./custom-add-sub-servicio.component.css']
})
export class CustomAddSubServicioComponent {
  @Input() id!: string;
  @Input() title!: string;
  @Input() class!: string;
  @Input() subServicio!: SubServicio | null;

  @Output() onResponseSubServicio = new EventEmitter<any>();

  // ================  ================ //
  formCustom = new FormGroup({
    nombre: new FormControl('', [Validators.required]),
    descripcion: new FormControl('', [Validators.required])
  });


  /** -------------------------------------- Constructor -------------------------------------- **/
  constructor(private router: Router) { }

  /** ---------------------------------------- OnInit ----------------------------------------- **/
  ngOnInit(): void {
    initFlowbite();

    if (this.subServicio !== null) {
      this.formCustom.controls.nombre.setValue(this.subServicio.nombre);
      this.formCustom.controls.descripcion.setValue(this.subServicio.descripcion);
    }
  }

  /** ---------------------------------------- Methods ---------------------------------------- **/

  /** ------------------------------------ Methods onClick ------------------------------------ **/
  onClick(bool: boolean) {
    if (bool) {
      if (this.formCustom.valid) {
        const nombre = letraCapital(String(this.formCustom.controls.nombre.value)).trim();
        const descripcion = letraCapitalInicial(String(this.formCustom.controls.descripcion.value)).trim()

        this.onResponseSubServicio.emit({
          bool,
          data: {
            nombre: nombre,
            descripcion: descripcion
          }
        });
      }
    } else {
      this.onResponseSubServicio.emit({ bool, data: 0 });
    }
  }

  /** ----------------------------------- Consultas Sevidor ----------------------------------- **/

  /** ---------------------------------- Onclick file import ---------------------------------- **/

  /** ---------------------------------------- Receiver --------------------------------------- **/

  /** --------------------------------------- ShowAlerts -------------------------------------- **/
}
