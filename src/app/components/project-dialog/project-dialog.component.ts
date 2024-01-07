import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { Work } from '../../models/work.model';

@Component({
  selector: 'jl-project-dialog',
  templateUrl: './project-dialog.component.html',
  styleUrls: ['./project-dialog.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ProjectDialogComponent implements OnInit {
  projectModel!: Work;

  constructor(
    public dialogRef: MatDialogRef<ProjectDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any,
  ) {}

  ngOnInit() {
    this.projectModel = new Work(this.data);
  }
}
