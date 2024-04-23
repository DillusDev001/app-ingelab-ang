import { Component, EventEmitter, Input, Output } from '@angular/core';

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
  @Input() spanClass!: string;
  @Input() selected!: string;

  @Output() onSpanClick: EventEmitter<boolean> = new EventEmitter();

  openMenu: boolean = false;
  class: string = 'rotate-180';

  OnClickMenu() {
    if (this.label == this.selected) {
      this.openMenu = !this.openMenu;
      if (this.openMenu) {
        this.class = ''; // open Menu
        this.onSpanClick.emit(true);
      } else {
        this.class = 'rotate-180'; // close Menu
        this.onSpanClick.emit(false);
      }
    }
  }

}
