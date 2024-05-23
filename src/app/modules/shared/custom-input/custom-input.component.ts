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

  ngOnInit(): void {
    if (this.type === 'password') this.isPassword = true;
  }

  showOrHiddenPassword() {
    this.inputFocus = true;
    this.classDiv = 'border-color-border';
    this.classIcon = 'text-color-icon-1';
    this.classInput = 'text-color-text';

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
    this.classDiv = 'border-color-border';
    this.classIcon = 'text-color-icon-1';
    this.classInput = 'text-color-text';
  }
  onBlur(): void {
    this.inputFocus = false;
    if (this.control !== null) {
      if (this.control.errors && this.control.touched) {
        this.classDiv = 'border-color-border-red text-color-error';
        this.classIcon = 'text-color-icon-red';
        this.classInput = 'text-color-error';
      } else if (!this.control.errors && this.control.touched) {
        this.classDiv = 'border-color-border-unfocus text-color-text-unfocus'
        this.classIcon = 'text-color-icon-unfocus';
        this.classInput = 'text-color-text';
      }
    }
  }
}

/* DIV
  [ngClass]=" { 
  'border-color-border-unfocus' : !inputFocus && !control.errors && !control.touched, 
  'border-color-border' : inputFocus , 
  'border-color-border-red' : control.errors && control.touched
}"*/


/* SPAN  ICON
  [ngClass]="{
  'text-color-icon-1' : inputFocus,
  'text-color-border-unfocus' : !inputFocus,
  'text-color-icon-red' : control.errors && control.touched
}"*/