import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-custom-drop-box',
  templateUrl: './custom-drop-box.component.html',
  styleUrls: ['./custom-drop-box.component.css']
})
export class CustomDropBoxComponent {

  @Input() data!: any[];
  @Input() label!: string;
  @Input() control!: FormControl;

  inputFocus: boolean = false;

  onFocus(): void {
    this.inputFocus = true;
    console.log(this.inputFocus)
  }
  onBlur(): void {
    this.inputFocus = false;
    console.log(this.inputFocus)
  }

}
