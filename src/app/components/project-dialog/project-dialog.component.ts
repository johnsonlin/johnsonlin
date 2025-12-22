import { Component, inject, OnInit, ViewEncapsulation } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

import { Work } from '../../models/work.model';

@Component({
  selector: 'jl-project-dialog',
  templateUrl: './project-dialog.component.html',
  styleUrls: ['./project-dialog.component.scss'],
  encapsulation: ViewEncapsulation.None,
  imports: [MatDialogModule, MatButtonModule, MatIconModule],
})
export class ProjectDialogComponent implements OnInit {
  dialogRef = inject<MatDialogRef<ProjectDialogComponent>>(MatDialogRef);
  private data = inject(MAT_DIALOG_DATA);

  projectModel!: Work;

  ngOnInit() {
    this.projectModel = new Work(this.data);
  }
}
