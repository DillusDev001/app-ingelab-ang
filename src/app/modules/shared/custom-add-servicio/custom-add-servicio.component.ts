import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { initFlowbite } from 'flowbite';
import { Servicio } from 'src/app/shared/interfaces/app/servicio-module/servicio';
import { letraCapital, letraCapitalInicial } from 'src/app/shared/utils/utils.utils';

@Component({
  selector: 'app-custom-add-servicio',
  templateUrl: './custom-add-servicio.component.html',
  styleUrls: ['./custom-add-servicio.component.css']
})
export class CustomAddServicioComponent implements OnInit {

  @Input() id!: string;
  @Input() title!: string;
  @Input() label1!: string;
  @Input() label2!: string;
  @Input() class!: string;
  @Input() icon!: string;
  @Input() servicio!: Servicio | null;

  @Output() onResponse = new EventEmitter<any>();

  // ================  ================ //
  formCustom = new FormGroup({
    value1: new FormControl('', [Validators.required]),
    value2: new FormControl('', [Validators.required])
  });


  /** -------------------------------------- Constructor -------------------------------------- **/
  constructor(private router: Router) { }

  /** ---------------------------------------- OnInit ----------------------------------------- **/
  ngOnInit(): void { 
    initFlowbite();

    if(this.servicio !== null){
      this.formCustom.controls.value1.setValue(this.servicio.nombre);
      this.formCustom.controls.value2.setValue(this.servicio.descripcion);
    }
  }

  /** ---------------------------------------- Methods ---------------------------------------- **/

  /** ------------------------------------ Methods onClick ------------------------------------ **/
  onClick(bool: boolean) {
    if (bool) {
      if (this.formCustom.valid) {
        const value1 = letraCapital(String(this.formCustom.controls.value1.value)).trim();
        const value2 = letraCapitalInicial(String(this.formCustom.controls.value2.value)).trim();

        this.onResponse.emit({ bool, data: { value1: value1, value2: value2 } });
      }
    } else {
      this.onResponse.emit({ bool, data: 0 });
    }
  }

  /** ----------------------------------- Consultas Sevidor ----------------------------------- **/

  /** ---------------------------------- Onclick file import ---------------------------------- **/

  /** ---------------------------------------- Receiver --------------------------------------- **/

  /** --------------------------------------- ShowAlerts -------------------------------------- **/
}
