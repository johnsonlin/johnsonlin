import { Component } from '@angular/core';
import { Store } from '@ngrx/store';

import { NAV_ITEMS } from '../../app.constants';
import { UiActions } from '../../ngrx/ui/ui.actions';
import { RouterLink } from '@angular/router';
import { MaterialModule } from '../../material/material.module';

@Component({
  selector: 'jl-mobile-nav-menu',
  templateUrl: './mobile-nav-menu.component.html',
  styleUrls: ['./mobile-nav-menu.component.scss'],
  imports: [
    RouterLink,
    MaterialModule
  ],
})
export class MobileNavMenuComponent {
  navItems = NAV_ITEMS;

  constructor(private store: Store<any>) {}

  closeSidenav() {
    this.store.dispatch(UiActions.closeSidenav());
  }
}
