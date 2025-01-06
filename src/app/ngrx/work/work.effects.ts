import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, concatMap, map } from 'rxjs/operators';

import { WorksService } from '../../services/works.service';

import { WorkActions } from './work.actions';

@Injectable()
export class WorkEffects {
  private actions$ = inject(Actions);
  private worksService = inject(WorksService);

  loadWorks$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(WorkActions.loadWorks),
      concatMap(() =>
        this.worksService.getWorks().pipe(
          map((data) => WorkActions.loadWorksSuccess({ works: data })),
          catchError((error) => of(WorkActions.loadWorksFailure({ error }))),
        ),
      ),
    );
  });
}
