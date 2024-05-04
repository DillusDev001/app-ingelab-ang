import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { initFlowbite } from 'flowbite';
import { ApiResult } from 'src/app/shared/interfaces/api/api.result';
import { ResponseEvent } from 'src/app/shared/interfaces/event/response.event';
import { letraCapital, letraCapitalInicial } from 'src/app/shared/utils/utils.utils';

@Component({
  selector: 'app-custom-alert-input',
  templateUrl: './custom-alert-input.component.html',
  styleUrls: ['./custom-alert-input.component.css']
})
export class CustomAlertInputComponent {

  result!: ApiResult;

  @Input() id!: string;
  @Input() title!: string;
  @Input() label!: string;
  @Input() type!: string;
  @Input() icon!: string;

  @Output() onResponse = new EventEmitter<ResponseEvent>();

  // ================  ================ //
  formCustom = new FormGroup({
    value: new FormControl('', [Validators.required])
  });


  /** -------------------------------------- Constructor -------------------------------------- **/
  constructor(private router: Router) { }

  /** ---------------------------------------- OnInit ----------------------------------------- **/
  ngOnInit(): void { initFlowbite(); }

  /** ---------------------------------------- Methods ---------------------------------------- **/

  /** ------------------------------------ Methods onClick ------------------------------------ **/
  onClick(bool: boolean) {
    if (bool) {
      if (this.formCustom.valid) {
        let value;
        if (this.type === 'number') {
          value = Number(this.formCustom.controls.value.value);
        } else {
          value = String(this.formCustom.controls.value.value);
        }

        this.onResponse.emit({ bool, data: value });
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
