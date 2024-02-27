import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-custom-alert-confirmation',
  templateUrl: './custom-alert-confirmation.component.html',
  styleUrls: ['./custom-alert-confirmation.component.css']
})
export class CustomAlertConfirmationComponent {

  @Output() alerConfirmationEven = new EventEmitter<any>();

  @Input() msgAlert!: String;
  @Input() strBtn1!: String;
  @Input() strBtn2!: String;

  onClickResponse(sw: boolean) {
    this.alerConfirmationEven.emit(sw);
  }

}
