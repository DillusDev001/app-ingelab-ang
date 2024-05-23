import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Servicio } from 'src/app/shared/interfaces/app/servicio-module/servicio';

@Component({
  selector: 'app-custom-card-servicio',
  templateUrl: './custom-card-servicio.component.html',
  styleUrls: ['./custom-card-servicio.component.css']
})
export class CustomCardServicioComponent {
  @Input() id!: string;
  @Input() servicio!: Servicio;
  @Input() index!: number;
  @Input() class!: string;
  @Input() selected!: string;

  @Output() response: EventEmitter<any> = new EventEmitter<any>()

  onClickEdit() {
    this.response.emit(
      {
        bool: true,
        data: {
          id_servicio: this.servicio.id_servicio,
          index: this.index,
          type: 'editar'
        }
      });
  }

  onClickVerCuenta() {
    this.response.emit(
      {
        bool: true,
        data: {
          id_servicio: this.servicio.id_servicio,
          index: this.index,
          type: 'cuenta'
        }
      });
  }
}
