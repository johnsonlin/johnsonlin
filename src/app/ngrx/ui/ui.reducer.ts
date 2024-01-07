import { createFeature, createReducer, on } from '@ngrx/store';

import { UiActions } from './ui.actions';

export const uiFeatureKey = 'ui';

export interface State {
  sideNavOpened: boolean;
}

export const initialState: State = {
  sideNavOpened: false,
};

export const reducer = createReducer(
  initialState,
  on(UiActions.openSidenav, (state) => ({ ...state, sideNavOpened: true })),
  on(UiActions.closeSidenav, (state) => ({ ...state, sideNavOpened: false })),
  on(UiActions.toggleSidenav, (state) => ({
    ...state,
    sideNavOpened: !state.sideNavOpened,
  })),
);

export const uiFeature = createFeature({
  name: uiFeatureKey,
  reducer,
});

export const { selectSideNavOpened } = uiFeature;
