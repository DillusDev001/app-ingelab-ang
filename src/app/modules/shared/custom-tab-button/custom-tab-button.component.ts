import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-custom-tab-button',
  templateUrl: './custom-tab-button.component.html',
  styleUrls: ['./custom-tab-button.component.css']
})
export class CustomTabButtonComponent {
  @Input() id!: string;
  @Input() label!: string;
  @Input() icon!: string;
  @Input() class!: string;
  @Input() spanClass!: string;
  @Input() selected!: string;
}
