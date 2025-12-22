import { Component, inject, input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatGridListModule } from '@angular/material/grid-list';
import { Event, NavigationStart, Router } from '@angular/router';
import { fromEvent, merge, Observable, of } from 'rxjs';
import { debounceTime, filter, map, takeUntil } from 'rxjs/operators';

import { GRID_COLS_DESKTOP, GRID_COLS_MOBILE, MOBILE_BREAK_POINT } from '../../app.constants';
import { Work } from '../../models/work.model';
import { ProjectDialogComponent } from '../project-dialog/project-dialog.component';
import { ProjectTileComponent } from '../project-tile/project-tile.component';

declare const window: Window;

@Component({
  selector: 'jl-project-grid',
  templateUrl: './project-grid.component.html',
  styleUrls: ['./project-grid.component.scss'],
  imports: [ProjectTileComponent, MatGridListModule],
})
export class ProjectGridComponent implements OnInit {
  private router = inject(Router);
  private dialog = inject(MatDialog);

  readonly projectList = input<Work[] | null>([]);
  gridSettings = { cols: GRID_COLS_DESKTOP };
  routeChanging$!: Observable<Event>;

  ngOnInit() {
    this.routeChanging$ = this.router.events.pipe(filter((e) => e instanceof NavigationStart));

    this.setupGrid();
  }

  setupGrid() {
    merge(
      of(window.innerWidth),
      fromEvent<UIEvent>(window, 'resize').pipe(map(() => window.innerWidth)),
    )
      .pipe(debounceTime(500), takeUntil(this.routeChanging$))
      .subscribe((innerWidth) => {
        this.gridSettings.cols =
          innerWidth > MOBILE_BREAK_POINT ? GRID_COLS_DESKTOP : GRID_COLS_MOBILE;
      });
  }

  showProjectDetails(project: Work) {
    this.dialog.open(ProjectDialogComponent, {
      data: project,
      autoFocus: 'dialog',
      maxWidth: '80vw',
    });
  }
}
