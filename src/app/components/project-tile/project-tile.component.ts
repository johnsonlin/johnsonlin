import { Component, input, OnInit } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';

import { Work } from '../../models/work.model';

@Component({
  selector: 'jl-project-tile',
  templateUrl: './project-tile.component.html',
  styleUrls: ['./project-tile.component.scss'],
  imports: [MatGridListModule],
})
export class ProjectTileComponent implements OnInit {
  readonly project = input<Work>();
  projectModel!: Work;

  ngOnInit() {
    const project = this.project();

    if (project) {
      this.projectModel = new Work(project);
    }
  }
}
