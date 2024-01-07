import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ChartType, ChartTypeRegistry } from 'chart.js/auto';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ComponentsModule } from '../../components/components.module';
import { MaterialModule } from '../../material/material.module';
import { SkillActions } from '../../ngrx/skill/skill.actions';
import {
  selectSkills,
  selectSkillsError,
  selectSkillsLoading,
} from '../../ngrx/skill/skill.reducer';

@Component({
  selector: 'jl-skills',
  standalone: true,
  imports: [CommonModule, MaterialModule, ComponentsModule],
  templateUrl: './skills.component.html',
  styleUrl: './skills.component.scss',
})
export class SkillsComponent implements OnInit {
  skillsetConfig: { name: string; type: ChartType }[] = [
    { name: 'Frontend Essential', type: 'radar' },
    { name: 'Frontend Advanced', type: 'radar' },
    { name: 'Backend', type: 'radar' },
    { name: 'Development Tools', type: 'radar' },
    { name: 'Application', type: 'bar' },
    { name: 'Language', type: 'bar' },
  ];

  skillsLoading$!: Observable<boolean>;
  skills$!: Observable<any>;
  skillsError$!: Observable<unknown>;

  constructor(private store: Store<any>) {}

  ngOnInit() {
    this.skillsLoading$ = this.store.select(selectSkillsLoading);
    this.skills$ = this.store.select(selectSkills).pipe(
      map((skills) => {
        return this.skillsetConfig.map((item) => ({
          ...item,
          data: skills[item.name],
        }));
      }),
    );
    this.skillsError$ = this.store.select(selectSkillsError);

    this.store.dispatch(SkillActions.loadSkills());
  }
}
