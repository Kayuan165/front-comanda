import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

export interface FabConfig {
  label: string;
  route: string;
  icon?: string;
}
@Component({
  selector: 'app-fab',
  imports: [RouterLink],
  standalone: true,
  templateUrl: './fab.html',
  styleUrl: './fab.scss'
})
export class Fab {
@Input({required: true}) config!: FabConfig;
}
