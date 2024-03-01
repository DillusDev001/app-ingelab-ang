import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-custom-title',
  templateUrl: './custom-title.component.html',
  styleUrls: ['./custom-title.component.css']
})
export class CustomTitleComponent {

  @Input() id!: string;
  @Input() label!: string;
  @Input() class!: string;

  /*@Input() type!: string;
  @Input() autocomplete!: string;
  
  @Input() control!: FormControl;
  @Input() icon!: string;*/

}
