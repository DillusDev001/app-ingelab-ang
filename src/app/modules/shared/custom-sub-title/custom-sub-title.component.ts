import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-custom-sub-title',
  templateUrl: './custom-sub-title.component.html',
  styleUrls: ['./custom-sub-title.component.css']
})
export class CustomSubTitleComponent {

  @Input() id!: string;
  @Input() label!: string | null | undefined;
  @Input() class!: string;

}
