import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-custom-menu-button',
  templateUrl: './custom-menu-button.component.html',
  styleUrls: ['./custom-menu-button.component.css']
})
export class CustomMenuButtonComponent {

  @Input() id!: string;
  @Input() label!: string;
  @Input() icon!: string;
  @Input() submenu!: boolean;
  @Input() selected!: string;

  openMenu: boolean = false;
  class: string = 'rotate-180';

  OnClickMenu() {
    if (this.label == this.selected) {
      this.openMenu = !this.openMenu;
      if (this.openMenu) {
        this.class = ''; // open Menu
      } else {
        this.class = 'rotate-180'; // close Menu
      }
    }
  }

}
