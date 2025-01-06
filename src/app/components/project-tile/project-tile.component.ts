import { Component, Input, OnInit } from '@angular/core';

import { Work } from '../../models/work.model';
import { MaterialModule } from '../../material/material.module';

@Component({
  selector: 'jl-project-tile',
  templateUrl: './project-tile.component.html',
  styleUrls: ['./project-tile.component.scss'],
  imports: [
    MaterialModule
  ]
})
export class ProjectTileComponent implements OnInit {
  @Input() project: any;
  projectModel!: Work;

  constructor() {}

  ngOnInit() {
    this.projectModel = new Work(this.project);
  }
}
