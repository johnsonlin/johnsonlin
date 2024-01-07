import { Component } from '@angular/core';
import { Store } from '@ngrx/store';

import { UiActions } from '../../ngrx/ui/ui.actions';

@Component({
  selector: 'jl-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.scss'],
})
export class NavMenuComponent {
  constructor(private store: Store<any>) {}

  toggleSidenav() {
    this.store.dispatch(UiActions.toggleSidenav());
  }
}
