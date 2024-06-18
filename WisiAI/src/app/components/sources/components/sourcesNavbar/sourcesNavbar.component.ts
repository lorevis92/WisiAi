import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-sources-navbar',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './sourcesNavbar.component.html',
  styleUrls: ['./sourcesNavbar.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class SourcesNavbarComponent { }
