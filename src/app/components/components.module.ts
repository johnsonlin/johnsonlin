import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NgChartsModule } from 'ng2-charts';

import { MaterialModule } from '../material/material.module';

import { ContactFormComponent } from './contact-form/contact-form.component';
import { MobileNavMenuComponent } from './mobile-nav-menu/mobile-nav-menu.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { ProjectDialogComponent } from './project-dialog/project-dialog.component';
import { ProjectGridComponent } from './project-grid/project-grid.component';
import { ProjectTileComponent } from './project-tile/project-tile.component';
import { SkillsMatrixComponent } from './skills-matrix/skills-matrix.component';

@NgModule({
  declarations: [
    ContactFormComponent,
    MobileNavMenuComponent,
    NavMenuComponent,
    ProjectDialogComponent,
    ProjectGridComponent,
    ProjectTileComponent,
    SkillsMatrixComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    RouterLink,
    RouterLinkActive,
    NgChartsModule,
  ],
  exports: [
    ContactFormComponent,
    MobileNavMenuComponent,
    NavMenuComponent,
    ProjectDialogComponent,
    ProjectGridComponent,
    ProjectTileComponent,
    SkillsMatrixComponent,
  ],
})
export class ComponentsModule {}
