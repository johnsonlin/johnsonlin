import { Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';

import { NAV_ITEMS } from '../../app.constants';
import { UiActions } from '../../ngrx/ui/ui.actions';

@Component({
  selector: 'jl-mobile-nav-menu',
  templateUrl: './mobile-nav-menu.component.html',
  styleUrls: ['./mobile-nav-menu.component.scss'],
  imports: [RouterLink, MatListModule, MatIconModule],
})
export class MobileNavMenuComponent {
  private store = inject(Store);

  navItems = NAV_ITEMS;

  closeSidenav() {
    this.store.dispatch(UiActions.closeSidenav());
  }
}
