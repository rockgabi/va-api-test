import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FacilitiesComponent } from './facilities.component';
import { ListComponent } from './list/list.component';
import { DetailsComponent } from './details/details.component';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';

const routes: Routes = [
  {
    path: 'facilities',
    children: [
      { path: '', component: FacilitiesComponent },
      { path: ':id/details', component:  DetailsComponent },
    ]
  }
];

@NgModule({
  declarations: [FacilitiesComponent, ListComponent],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes),
    NgbPaginationModule,
  ]
})
export class FacilitiesModule { }
