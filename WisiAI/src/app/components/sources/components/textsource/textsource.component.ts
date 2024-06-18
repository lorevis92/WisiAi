import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SourcesNavbarComponent } from "../sourcesNavbar/sourcesNavbar.component";

@Component({
    selector: 'app-textsource',
    standalone: true,
    templateUrl: `./textsource.component.html`,
    styleUrls: ['./textsource.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        CommonModule,
        SourcesNavbarComponent
    ]
})
export class TextsourceComponent { }
