import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SourcesNavbarComponent } from "../sourcesNavbar/sourcesNavbar.component";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { GptService } from 'src/app/services/gpt.service';

@Component({
    selector: 'app-filesource',
    standalone: true,
    templateUrl: './filesource.component.html',
    styleUrls: ['./filesource.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        CommonModule,
        SourcesNavbarComponent,
        ReactiveFormsModule
    ]
})

export class FilesourceComponent {
  files: File[] = [];
  fileForm: FormGroup;

  constructor(private fb: FormBuilder, private gptService: GptService) {
    this.fileForm = this.fb.group({
      file: [null, Validators.required],
    });
  }

  onFileChange(event: any) {
    const files: FileList = event.target.files;
    for (let i = 0; i < files.length; i++) {
      const file = files.item(i);
      if (file) {
        this.files.push(file);
      }
    }
  }
  

  removeFile(index: number) {
    this.files.splice(index, 1);
  }

  onSubmit() {
   
 }
}