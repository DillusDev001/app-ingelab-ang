import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-custom-label0',
  templateUrl: './custom-label0.component.html',
  styleUrls: ['./custom-label0.component.css']
})
export class CustomLabel0Component {

  @Input() id!: string;
  @Input() label!: string;
  @Input() text!: string|null;
  @Input() class!: string;
  
}
