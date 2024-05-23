import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-custom-input2',
  templateUrl: './custom-input2.component.html',
  styleUrls: ['./custom-input2.component.css']
})
export class CustomInput2Component {

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
