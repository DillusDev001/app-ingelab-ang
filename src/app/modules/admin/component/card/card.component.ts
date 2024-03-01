import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent {
  @Input() id!: string;
  @Input() label!: string;
  @Input() description!: string;
  @Input() class!: string;
  @Input() icon!: string;
}
