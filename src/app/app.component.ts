import { Component, DestroyRef, inject, OnInit, ViewChild } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';
import { distinctUntilChanged, Observable } from 'rxjs';

import { MobileNavMenuComponent } from './components/mobile-nav-menu/mobile-nav-menu.component';
import { NavMenuComponent } from './components/nav-menu/nav-menu.component';
import { UiActions } from './ngrx/ui/ui.actions';
import { selectSideNavOpened } from './ngrx/ui/ui.reducer';

@Component({
  selector: 'jl-root',
  imports: [RouterOutlet, MatSidenavModule, MobileNavMenuComponent, NavMenuComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  private store = inject(Store);

  @ViewChild('sidenav', { static: true }) sidenav!: MatSidenav;
  sideNavOpened$!: Observable<boolean>;
  private destroyRef = inject(DestroyRef);

  ngOnInit() {
    this.sideNavOpened$ = this.store.select(selectSideNavOpened);

    this.sideNavOpened$
      .pipe(distinctUntilChanged(), takeUntilDestroyed(this.destroyRef))
      .subscribe((opened) => {
        if (opened) {
          this.sidenav.open();
        } else {
          this.sidenav.close();
        }
      });
  }

  closeSidenav() {
    this.store.dispatch(UiActions.closeSidenav());
  }
}
