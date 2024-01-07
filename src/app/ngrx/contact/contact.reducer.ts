import { createFeature, createReducer, createSelector, on } from '@ngrx/store';

import { selectWorksError } from '../work/work.reducer';

import { ContactActions } from './contact.actions';

export const contactFeatureKey = 'contact';

export interface State {
  messageSending: boolean;
  messageSent: boolean;
  messageError: unknown;
}

export const initialState: State = {
  messageSending: false,
  messageSent: false,
  messageError: null,
};

export const reducer = createReducer(
  initialState,
  on(ContactActions.sendMessage, (state) => ({
    ...state,
    messageSending: true,
    messageSent: false,
    messageError: null,
  })),
  on(ContactActions.sendMessageSuccess, (state) => ({
    ...state,
    messageSending: false,
    messageSent: true,
  })),
  on(ContactActions.sendMessageFailure, (state, action) => ({
    ...state,
    messageSending: false,
    messageSent: false,
    messageError: action.error,
  })),
);

export const contactFeature = createFeature({
  name: contactFeatureKey,
  reducer,
  extraSelectors: ({ selectContactState }) => ({
    selectMessageSending: createSelector(
      selectContactState,
      (state) => state.messageSending,
    ),
    selectMessageSent: createSelector(
      selectContactState,
      (state) => state.messageSent,
    ),
    selectMessageError: createSelector(
      selectContactState,
      (state) => state.messageError,
    ),
  }),
});

export const { selectMessageSending, selectMessageSent, selectMessageError } =
  contactFeature;
