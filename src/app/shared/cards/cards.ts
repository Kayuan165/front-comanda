import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-cards',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './cards.html',
  styleUrl: './cards.scss',
})
export class Cards {
  @Input() title: string = '';
  @Input() value: number | string = 0;
  @Input() icon: string = '';
  @Input() loading: boolean = false;
  @Input() error: boolean = false;
  @Input() color: string = 'primary';
}
