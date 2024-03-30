import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiResult } from 'src/app/shared/interfaces/api/api.result';
import { CodeService } from 'src/app/shared/services/code/code.service';

@Component({
  selector: 'app-custom-code',
  templateUrl: './custom-code.component.html',
  styleUrls: ['./custom-code.component.css']
})
export class CustomCodeComponent {

  @Input() id!: string;
  @Input() label!: string;
  @Input() type!: string;
  @Input() autocomplete!: string;
  @Input() class!: string;
  @Input() icon!: string;

  @Output() alerConfirmationEven = new EventEmitter<ApiResult | null>();

  formCode = new FormGroup({
    num1: new FormControl('', [Validators.required]),
    num2: new FormControl('', [Validators.required]),
    num3: new FormControl('', [Validators.required]),
    num4: new FormControl('', [Validators.required]),
  });

  msgString: string = '';
  msgBoolean: boolean = false;

  constructor(private codeService: CodeService) { }

  onClickFindCode() {
    if (this.formCode.valid) {
      this.msgBoolean = false;

      const code = String(this.formCode.controls.num1.value) +
        String(this.formCode.controls.num2.value) +
        String(this.formCode.controls.num3.value) +
        String(this.formCode.controls.num4.value);

      this.codeService.authLogin(code).subscribe(data => {
        data as ApiResult;

        if (data.boolean) {
          this.responseFound(data);
        } else {
          this.msgString = data.message;
          this.msgBoolean = true;
        }
      });
    }
  }

  onClickClose() {
    this.responseCancel();
  }

  responseFound(data: ApiResult) {
    this.alerConfirmationEven.emit(data);
  }

  responseCancel() {
    this.alerConfirmationEven.emit(null);
  }


  myKeyPress(e: any, input: any, pos: number) {
    const functionalKeys = ['Backspace', 'ArrowRight', 'ArrowLeft', 'Delete', 'Tab'];
    const numberKeys = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
    let next = e.target.nextElementSibling;

    if (functionalKeys.indexOf(e.key) !== -1) {
      // doSomething
      return;
    }

    if (numberKeys.indexOf(e.key) !== -1) {
      // doSomething
      this.setNumberInput(pos, e.key);
      if (next) {
        e.preventDefault();
        next.focus();
      } else {
        e.target.blur();
      }
      return
    }
  }

  setNumberInput(n: number, value: string) {
    switch (n) {
      case 1:
        this.formCode.controls.num1.setValue(value);
        break;

      case 2:
        this.formCode.controls.num2.setValue(value);
        break;

      case 3:
        this.formCode.controls.num3.setValue(value);
        break;

      case 4:
        this.formCode.controls.num4.setValue(value);
        break;
    }
  }

  private replaceSelection(input: any, key: any) {
    const inputValue = input.value;
    const start = input.selectionStart;
    const end = input.selectionEnd || input.selectionStart;
    return inputValue.substring(0, start) + key + inputValue.substring(end + 1);
  }
}
