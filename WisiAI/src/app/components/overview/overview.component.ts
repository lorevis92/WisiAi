import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { InterfacciaChatComponent } from "../sources/components/interfacciaChat/interfacciaChat.component";
import { AssistantService } from 'src/app/services/assistant.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
    selector: 'app-overview',
    standalone: true,
    templateUrl: `./overview.component.html`,
    styleUrls: ['./overview.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        CommonModule,
        InterfacciaChatComponent,
        HttpClientModule,
    ]
})

export class OverviewComponent implements OnInit { 


      constructor(private assistantService: AssistantService) { }

      ngOnInit(): void {}
}
