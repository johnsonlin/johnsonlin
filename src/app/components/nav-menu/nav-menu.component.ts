import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';

import { UiActions } from '../../ngrx/ui/ui.actions';

@Component({
  selector: 'jl-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.scss'],
  imports: [RouterLink, MatIconModule, MatButtonModule],
})
export class NavMenuComponent {
  private store = inject(Store);

  toggleSidenav() {
    this.store.dispatch(UiActions.toggleSidenav());
  }
}
