import { CommonModule } from '@angular/common';
import {
  Component,
  DestroyRef,
  inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatSidenav } from '@angular/material/sidenav';
import { RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';
import { distinctUntilChanged, Observable } from 'rxjs';

import { ComponentsModule } from './components/components.module';
import { MaterialModule } from './material/material.module';
import { UiActions } from './ngrx/ui/ui.actions';
import { selectSideNavOpened, State } from './ngrx/ui/ui.reducer';

@Component({
  selector: 'jl-root',
  imports: [CommonModule, RouterOutlet, MaterialModule, ComponentsModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  @ViewChild('sidenav', { static: true }) sidenav!: MatSidenav;
  sideNavOpened$!: Observable<boolean>;
  private destroyRef = inject(DestroyRef);

  constructor(private store: Store<any>) {}

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
