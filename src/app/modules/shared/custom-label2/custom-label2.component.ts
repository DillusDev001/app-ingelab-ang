import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-custom-label2',
  templateUrl: './custom-label2.component.html',
  styleUrls: ['./custom-label2.component.css']
})
export class CustomLabel2Component {

  @Input() id!: string;
  @Input() label!: string;
  @Input() text!: string;
  @Input() class!: string;

}
