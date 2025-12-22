import { createFeatureSelector } from '@ngrx/store';

import * as fromUi from './ui.reducer';

export const selectUIState = createFeatureSelector<fromUi.State>(fromUi.uiFeatureKey);
