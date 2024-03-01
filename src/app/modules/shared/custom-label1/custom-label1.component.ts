import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-custom-label1',
  templateUrl: './custom-label1.component.html',
  styleUrls: ['./custom-label1.component.css']
})
export class CustomLabel1Component {

  @Input() id!: string;
  @Input() label!: string;
  @Input() text!: string;
  @Input() class!: string;
  
}
