import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-custom-input3',
  templateUrl: './custom-input3.component.html',
  styleUrls: ['./custom-input3.component.css']
})
export class CustomInput3Component {

  @Input() id!: string;
  @Input() label!: string;
  @Input() text!: string;
  @Input() class!: string;
  @Input() icon!: string;

  classDiv: string = 'border-color-border-unfocus ';
  classIcon: string = 'text-color-icon-unfocus';
  classInput: string = 'text-color-icon-unfocus';
  classLabel: string = 'border-color-border-unfocus text-color-text-unfocus';

  isPassword!: boolean;
  isHidden: boolean = true;

  inputText: string = '';
  inputFocus: boolean = false;

  constructor() {

  }

  ngOnInit(): void { }
}
