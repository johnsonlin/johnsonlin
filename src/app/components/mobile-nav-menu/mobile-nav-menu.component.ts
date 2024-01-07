import { Component } from '@angular/core';
import { Store } from '@ngrx/store';

import { NAV_ITEMS } from '../../app.constants';
import { UiActions } from '../../ngrx/ui/ui.actions';

@Component({
  selector: 'jl-mobile-nav-menu',
  templateUrl: './mobile-nav-menu.component.html',
  styleUrls: ['./mobile-nav-menu.component.scss'],
})
export class MobileNavMenuComponent {
  navItems = NAV_ITEMS;

  constructor(private store: Store<any>) {}

  closeSidenav() {
    this.store.dispatch(UiActions.closeSidenav());
  }
}
