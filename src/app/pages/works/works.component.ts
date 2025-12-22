import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { ProjectGridComponent } from '../../components/project-grid/project-grid.component';
import { Work } from '../../models/work.model';
import { WorkActions } from '../../ngrx/work/work.actions';
import { selectWorks, selectWorksError, selectWorksLoading } from '../../ngrx/work/work.reducer';

@Component({
  selector: 'jl-works',
  imports: [CommonModule, MatProgressBarModule, ProjectGridComponent],
  templateUrl: './works.component.html',
  styleUrls: ['./works.component.scss'],
})
export class WorksComponent implements OnInit {
  private store = inject(Store);

  worksLoading$!: Observable<boolean>;
  works$!: Observable<Work[]>;
  worksLoadError$!: Observable<string | null>;

  ngOnInit() {
    this.worksLoading$ = this.store.select(selectWorksLoading);
    this.works$ = this.store.select(selectWorks);
    this.worksLoadError$ = this.store.select(selectWorksError);

    this.store.dispatch(WorkActions.loadWorks());
  }
}
