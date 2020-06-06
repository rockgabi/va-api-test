import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { FeatherModule } from 'angular-feather';
import { Eye } from 'angular-feather/icons';
import { NgxJsonViewerModule } from 'ngx-json-viewer';

import { FacilitiesComponent } from './facilities.component';
import { DetailsComponent } from './details/details.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'facilities',
    pathMatch: 'full',
  },
  {
    path: 'facilities',
    children: [
      { path: '', component: FacilitiesComponent },
      { path: ':id', component: DetailsComponent },
    ]
  }
];

@NgModule({
  declarations: [FacilitiesComponent, DetailsComponent],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes),
    NgbPaginationModule,
    FeatherModule.pick({ Eye }),
    NgxJsonViewerModule,
  ]
})
export class FacilitiesModule { }
