import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, concatMap, map } from 'rxjs/operators';

import { ContactService } from '../../services/contact.service';

import { ContactActions } from './contact.actions';

@Injectable()
export class ContactEffects {
  private actions$ = inject(Actions);
  private contactService = inject(ContactService);

  sendMessage$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ContactActions.sendMessage),
      map(({ data }) => data),
      concatMap(({ from, email, message }) =>
        /** An EMPTY observable only emits completion. Replace with your own observable API request */
        this.contactService.sendMessage(from, email, message).pipe(
          map(() => ContactActions.sendMessageSuccess()),
          catchError((error) => of(ContactActions.sendMessageFailure({ error }))),
        ),
      ),
    );
  });
}
