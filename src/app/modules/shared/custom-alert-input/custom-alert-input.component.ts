import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { initFlowbite } from 'flowbite';
import { ApiResult } from 'src/app/shared/interfaces/api/api.result';
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
  @Input() label1!: string;
  @Input() label2!: string;
  @Input() class!: string;
  @Input() icon!: string;

  @Output() onResponse = new EventEmitter<any>();

  // ================  ================ //
  formCustom = new FormGroup({
    value1: new FormControl('', [Validators.required]),
    value2: new FormControl('', [Validators.required])
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
        const value1 = letraCapital(String(this.formCustom.controls.value1.value));
        const value2 = letraCapitalInicial(String(this.formCustom.controls.value2.value));

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
