import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';


type InputValue = string | number | undefined;
type InputType = 'text' | 'number' | 'email' ;

@Component({
  selector: 'app-embedded',
  standalone: true,
  imports: [
    CommonModule,
  ],
  template: `<div class = "form-control">
              <label [for] = "inputId" *ngIf = "label">{{ label }}</label>
              <input [type] = "type" [value] = "value" [id] = "inputId">
  `,
  styles: [`
    .form-control {display: block;
                    margin-bottom: 16px;
                    label, input {display: block;}
                    input {width: 100%; padding: 8px; border: 1px solid #ccc; border-radius: 4px;}
    }
`],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmbeddedComponent { 
  @Input() inputId = Math.random().toString(16);
  @Input() label = '';
  @Input() value : InputValue;
  @Input() type = '';
}
