import { Component, Input, OnInit } from '@angular/core';

import { Work } from '../../models/work.model';

@Component({
  selector: 'jl-project-tile',
  templateUrl: './project-tile.component.html',
  styleUrls: ['./project-tile.component.scss'],
})
export class ProjectTileComponent implements OnInit {
  @Input() project: any;
  projectModel!: Work;

  constructor() {}

  ngOnInit() {
    this.projectModel = new Work(this.project);
  }
}
