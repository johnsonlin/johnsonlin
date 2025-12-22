import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, concatMap, map } from 'rxjs/operators';

import { SkillsService } from '../../services/skills.service';

import { SkillActions } from './skill.actions';

@Injectable()
export class SkillEffects {
  private actions$ = inject(Actions);
  private skillsService = inject(SkillsService);

  loadSkills$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(SkillActions.loadSkills),
      concatMap(() =>
        /** An EMPTY observable only emits completion. Replace with your own observable API request */
        this.skillsService.getSkills().pipe(
          map((data) => SkillActions.loadSkillsSuccess({ data })),
          catchError((error) => of(SkillActions.loadSkillsFailure({ error }))),
        ),
      ),
    );
  });
}
