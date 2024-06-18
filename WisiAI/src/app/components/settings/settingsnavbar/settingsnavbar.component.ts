import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-settingsnavbar',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: `./settingsnavbar.component.html`,
  styleUrls: ['./settingsnavbar.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SettingsnavbarComponent { }
