import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-custom-label3',
  templateUrl: './custom-label3.component.html',
  styleUrls: ['./custom-label3.component.css']
})
export class CustomLabel3Component {

  @Input() id!: string;
  @Input() label!: string;
  @Input() text!: string | null;
  @Input() class!: string;

}
