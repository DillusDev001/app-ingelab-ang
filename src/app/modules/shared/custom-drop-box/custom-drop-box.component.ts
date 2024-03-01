import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-custom-drop-box',
  templateUrl: './custom-drop-box.component.html',
  styleUrls: ['./custom-drop-box.component.css']
})
export class CustomDropBoxComponent {

  @Input() id!: string;
  @Input() label!: string;
  @Input() control!: FormControl;
  @Input() class!: string;
  @Input() data!: any[];

  classSet: string = 'border-color-border-unfocus text-color-text-unfocus';

  inputFocus: boolean = false;

  onFocus(): void {
    this.inputFocus = true;
    this.classSet = 'focus:border-color-border text-color-text'
  }
  onBlur(): void {
    this.inputFocus = false;
    if (this.control.errors && this.control.touched) {
      this.classSet = 'border-color-border-red text-color-error';
    } else if(!this.control.errors && this.control.touched) {
      this.classSet = 'border-color-border-unfocus text-color-text-unfocus'
    }
  }
}


/*[ngClass]=" { 
  'border-color-border-unfocus text-color-text-unfocus' : !inputFocus && !control.valid && !control.touched, 
  'border-color-border-unfocus text-color-text' : !inputFocus, 
  'focus:border-color-border text-color-text' : inputFocus , 
  'border-color-border-red text-color-error' : control.errors && control.touched,
}"*/
