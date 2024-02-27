import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-custom-alert-info',
  templateUrl: './custom-alert-info.component.html',
  styleUrls: ['./custom-alert-info.component.css']
})
export class CustomAlertInfoComponent {

  @Output() alertInfoEvent = new EventEmitter<any>();

  @Input() msgAlert!: String;

  onClickResponse(sw: boolean) {
    this.alertInfoEvent.emit(sw);
  }
}
