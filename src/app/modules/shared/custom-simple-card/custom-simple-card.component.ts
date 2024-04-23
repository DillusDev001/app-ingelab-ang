import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ResponseEvent } from 'src/app/shared/interfaces/event/response.event';

@Component({
  selector: 'app-custom-simple-card',
  templateUrl: './custom-simple-card.component.html',
  styleUrls: ['./custom-simple-card.component.css']
})
export class CustomSimpleCardComponent {

  @Input() id!: string;
  @Input() label1!: string;
  @Input() label2!: string;
  @Input() class!: string;
  @Input() selected!: string;
  
  @Output() onEditClick: EventEmitter<any> = new EventEmitter<any>()

  onClickEdit(){
    this.onEditClick.emit(true);
  }
}
