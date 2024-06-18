import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SourcesNavbarComponent } from "../sourcesNavbar/sourcesNavbar.component";

@Component({
    selector: 'app-websitesource',
    standalone: true,
    templateUrl: `./websitesource.component.html`,
    styleUrls: ['./websitesource.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        CommonModule,
        SourcesNavbarComponent
    ]
})
export class WebsitesourceComponent { }
