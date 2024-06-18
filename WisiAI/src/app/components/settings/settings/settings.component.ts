import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SettingsnavbarComponent } from "../settingsnavbar/settingsnavbar.component";

@Component({
    selector: 'app-settings',
    standalone: true,
    templateUrl: './settings.component.html',
    styleUrls: ['./settings.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        CommonModule,
        SettingsnavbarComponent
    ]
})


export class SettingsComponent {
    
 }
