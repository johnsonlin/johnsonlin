import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createFeature, createReducer, createSelector, on } from '@ngrx/store';

import { Work } from '../../models/work.model';

import { WorkActions } from './work.actions';

export const worksFeatureKey = 'works';

export interface State extends EntityState<Work> {
  // additional entities state properties
  worksLoading: boolean;
  worksError: string | null;
}

export const adapter: EntityAdapter<Work> = createEntityAdapter<Work>({
  selectId: (model) => model.global_ID,
});

export const initialState: State = adapter.getInitialState({
  // additional entity state properties
  worksLoading: false,
  worksError: null,
});

export const reducer = createReducer(
  initialState,
  on(WorkActions.loadWorks, (state) => ({
    ...state,
    worksLoading: true,
    worksError: null,
  })),
  on(WorkActions.loadWorksSuccess, (state, action) => {
    return {
      ...adapter.setAll(action.works, state),
      worksLoading: false,
      worksError: null,
    };
  }),
  on(WorkActions.loadWorksFailure, (state, action) => ({
    ...state,
    worksLoading: false,
    worksError: action.error,
  })),
  on(WorkActions.clearWorks, (state) => adapter.removeAll(state)),
);

export const worksFeature = createFeature({
  name: worksFeatureKey,
  reducer,
  extraSelectors: ({ selectWorksState }) => {
    const adaptorSelectors = adapter.getSelectors(selectWorksState);

    return {
      ...adaptorSelectors,
      selectWorks: createSelector(
        adaptorSelectors.selectEntities,
        adaptorSelectors.selectIds,
        (entities, ids) => ids.map<Work>((id) => entities[id] || ({} as Work)),
      ),
      selectWorksLoading: createSelector(selectWorksState, (state) => state.worksLoading),
      selectWorksError: createSelector(selectWorksState, (state) => state.worksError),
    };
  },
});

export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
  selectWorks,
  selectWorksLoading,
  selectWorksError,
} = worksFeature;
