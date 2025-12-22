import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { Store } from '@ngrx/store';
import { ChartType } from 'chart.js/auto';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { SkillsMatrixComponent } from '../../components/skills-matrix/skills-matrix.component';
import { SkillSet } from '../../models/skill.model';
import { SkillActions } from '../../ngrx/skill/skill.actions';
import {
  selectSkills,
  selectSkillsError,
  selectSkillsLoading,
} from '../../ngrx/skill/skill.reducer';

@Component({
  selector: 'jl-skills',
  imports: [CommonModule, MatProgressBarModule, SkillsMatrixComponent],
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.scss'],
})
export class SkillsComponent implements OnInit {
  private store = inject(Store);

  skillSetConfig: { name: string; type: ChartType }[] = [
    { name: 'Frontend Essential', type: 'radar' },
    { name: 'Frontend Advanced', type: 'radar' },
    { name: 'Backend', type: 'radar' },
    { name: 'Development Tools', type: 'radar' },
    { name: 'Application', type: 'bar' },
    { name: 'Language', type: 'bar' },
  ];

  skillsLoading$!: Observable<boolean>;
  skills$!: Observable<{ name: string; type: ChartType; data: SkillSet }[]>;
  skillsError$!: Observable<unknown>;

  ngOnInit() {
    this.skillsLoading$ = this.store.select(selectSkillsLoading);
    this.skills$ = this.store.select(selectSkills).pipe(
      map((skills) => {
        return this.skillSetConfig.map((item) => ({
          ...item,
          data: skills![item.name],
        }));
      }),
    );
    this.skillsError$ = this.store.select(selectSkillsError);

    this.store.dispatch(SkillActions.loadSkills());
  }
}
