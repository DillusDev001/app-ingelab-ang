import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-custom-button',
  templateUrl: './custom-button.component.html',
  styleUrls: ['./custom-button.component.css']
})
export class CustomButtonComponent implements OnInit {
  /** ---------------------------------- Variables de Inicio ---------------------------------- **/
  @Input() id!: String;
  @Input() label!: String;
  @Input() type!: String;
  @Input() icon!: string;
  @Input() class!: string;
  @Input() valid!: boolean;

  classBtn!: string;

  /**
   * type -> accept (Guardar, Confirmar)
   * type -> cancel (Cancelar)
   * type -> error ()
   */

  /** -------------------------------------- Constructor -------------------------------------- **/
  constructor() { }

  /** ---------------------------------------- OnInit ----------------------------------------- **/
  ngOnInit(): void {

    switch (this.type) {
      case 'accept':
        this.class = this.class + ' bg-color-button-1 hover:bg-color-button-1-hover text-white';
        break;

      case 'cancel':
        this.class = this.class + ' bg-color-button-2 hover:bg-color-button-2-hover text-color-text-button-2 border-2 border-color-border';
        break;
    }

  }

}
