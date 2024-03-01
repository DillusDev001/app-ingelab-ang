import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-custom-sub-menu-button',
  templateUrl: './custom-sub-menu-button.component.html',
  styleUrls: ['./custom-sub-menu-button.component.css']
})
export class CustomSubMenuButtonComponent {

  @Input() id!: string;
  @Input() label!: string;
  @Input() icon!: string;
  @Input() submenu!: boolean;
  @Input() selected!: string;

  class: string ='';

}
