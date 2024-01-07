import { Routes } from '@angular/router';
import { provideEffects } from '@ngrx/effects';
import { provideState } from '@ngrx/store';

import { AppRoute } from './app.constants';
import { ContactEffects } from './ngrx/contact/contact.effects';
import { contactFeature } from './ngrx/contact/contact.reducer';
import { SkillEffects } from './ngrx/skill/skill.effects';
import { skillFeature } from './ngrx/skill/skill.reducer';
import { WorkEffects } from './ngrx/work/work.effects';
import { worksFeature } from './ngrx/work/work.reducer';

export const routes: Routes = [
  {
    path: AppRoute.Home,
    loadComponent: () =>
      import('./pages/home/home.component').then((mod) => mod.HomeComponent),
    title: 'Johnson Lin - Home',
  },
  {
    path: AppRoute.Works,
    loadComponent: () =>
      import('./pages/works/works.component').then((mod) => mod.WorksComponent),
    providers: [provideState(worksFeature), provideEffects([WorkEffects])],
  },
  {
    path: AppRoute.Skills,
    loadComponent: () =>
      import('./pages/skills/skills.component').then(
        (mod) => mod.SkillsComponent,
      ),
    providers: [provideState(skillFeature), provideEffects([SkillEffects])],
  },
  {
    path: AppRoute.Contact,
    loadComponent: () =>
      import('./pages/contact/contact.component').then(
        (mod) => mod.ContactComponent,
      ),
    providers: [provideState(contactFeature), provideEffects([ContactEffects])],
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
  },
];
