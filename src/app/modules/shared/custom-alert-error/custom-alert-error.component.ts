import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-custom-alert-error',
  templateUrl: './custom-alert-error.component.html',
  styleUrls: ['./custom-alert-error.component.css']
})
export class CustomAlertErrorComponent {

  @Output() alertInfoEvent = new EventEmitter<any>();

  @Input() msgAlert!: String;

  onClickResponse(sw: boolean) {
    this.alertInfoEvent.emit(sw);
  }

}
