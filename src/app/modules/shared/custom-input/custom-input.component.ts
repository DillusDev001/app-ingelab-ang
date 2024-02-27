import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-custom-input',
  templateUrl: './custom-input.component.html',
  styleUrls: ['./custom-input.component.css']
})
export class CustomInputComponent implements OnInit {

  @Input() id!: string;
  @Input() label!: string;
  @Input() type!: string;
  @Input() autocomplete!: string;
  @Input() class!: string;
  @Input() control!: FormControl;
  @Input() icon!: string;

  isPassword!: boolean;
  isHidden: boolean = true;

  inputText: string = '';
  inputFocus: boolean = false;

  constructor() {

  }

  ngOnInit(): void {
    if (this.type === 'password') this.isPassword = true;
  }

  showOrHiddenPassword() {
    this.inputFocus = true;
    this.isHidden = !this.isHidden;

    if (this.isHidden) {
      this.type = 'password';
    }
    else {
      this.type = 'text';
    }
  }

  onFocus(): void {
    this.inputFocus = true;
  }
  onBlur(): void {
    this.inputFocus = false;
  }
}
