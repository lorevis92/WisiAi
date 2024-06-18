import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SourcesNavbarComponent } from "./components/sourcesNavbar/sourcesNavbar.component";

@Component({
    selector: 'app-sources',
    standalone: true,
    templateUrl: `./sources.component.html`,
    styleUrls: ['./sources.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        CommonModule,
        SourcesNavbarComponent
    ]
})
export class SourcesComponent { }
