import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Event, NavigationStart, Router } from '@angular/router';
import { fromEvent, merge, Observable, of } from 'rxjs';
import { debounceTime, filter, map, takeUntil } from 'rxjs/operators';

import { GRID_COLS_DESKTOP, GRID_COLS_MOBILE, MOBILE_BREAK_POINT } from '../../app-constants';
import { ProjectModel } from '../../models/project.model';
import { ProjectDialogComponent } from '../project-dialog/project-dialog.component';

declare const window: Window;

@Component({
  selector: 'app-project-grid',
  templateUrl: './project-grid.component.html',
  styleUrls: ['./project-grid.component.scss']
})
export class ProjectGridComponent implements OnInit {
  @Input() projectList: ProjectModel[] = [];
  gridSettings: any = {cols: GRID_COLS_DESKTOP};
  routeChanging$: Observable<Event>;

  constructor(private router: Router, private dialog: MatDialog) { }

  ngOnInit() {
    this.routeChanging$ = this.router.events.pipe(filter(e => e instanceof NavigationStart));

    this.setupGrid();
  }

  setupGrid() {
    merge(
      of(window.innerWidth),
      fromEvent<UIEvent>(window, 'resize').pipe(map(() => window.innerWidth))
    )
      .pipe(
        debounceTime(500),
        takeUntil(this.routeChanging$)
      )
      .subscribe((innerWidth) => {
        this.gridSettings.cols = innerWidth > MOBILE_BREAK_POINT ? GRID_COLS_DESKTOP : GRID_COLS_MOBILE;
      });
  }

  showProjectDetails(project) {
    this.dialog.open(ProjectDialogComponent, {
      data: project
    });
  }
}
