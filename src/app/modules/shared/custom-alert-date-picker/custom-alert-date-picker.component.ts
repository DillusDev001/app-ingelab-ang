import { formatDate } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-custom-alert-date-picker',
  templateUrl: './custom-alert-date-picker.component.html',
  styleUrls: ['./custom-alert-date-picker.component.css']
})
export class CustomAlertDatePickerComponent implements OnInit {
  @Input() label!: any;
  @Input() fecha!: string;
  @Input() type!: string;
  @Output() response: EventEmitter<any> = new EventEmitter();

  formFecha = new FormGroup({
    fecha: new FormControl('', [Validators.required])
  });

  onClickAceptar(){
      const fecha = this.formFecha.controls.fecha.value;
      this.response.emit(fecha);
  }

  ngOnInit(): void {
    if(this.fecha !== ''){
      this.formFecha.controls.fecha.setValue(formatDate(this.fecha, 'yyyy-MM-dd', 'es'));
    } else {
      this.formFecha.controls.fecha.setValue('');
    }
  }
}
