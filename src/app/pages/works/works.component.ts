import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { ComponentsModule } from '../../components/components.module';
import { Work } from '../../models/work.model';
import { WorkActions } from '../../ngrx/work/work.actions';
import {
  selectWorks,
  selectWorksError,
  selectWorksLoading,
} from '../../ngrx/work/work.reducer';

@Component({
  selector: 'jl-works',
  imports: [CommonModule, MatProgressBarModule, ComponentsModule],
  templateUrl: './works.component.html',
  styleUrls: ['./works.component.scss'],
})
export class WorksComponent implements OnInit {
  worksLoading$!: Observable<boolean>;
  works$!: Observable<Work[]>;
  worksLoadError$!: Observable<string>;

  constructor(private store: Store<any>) {}

  ngOnInit() {
    this.worksLoading$ = this.store.select(selectWorksLoading);
    this.works$ = this.store.select(selectWorks);
    this.worksLoadError$ = this.store.select(selectWorksError);

    this.store.dispatch(WorkActions.loadWorks());
  }
}
