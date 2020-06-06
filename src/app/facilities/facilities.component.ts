import { Component, OnInit } from '@angular/core';
import { FacilityService } from '../shared/facility.service';

@Component({
  selector: 'app-facilities',
  templateUrl: './facilities.component.html',
  styleUrls: ['./facilities.component.scss']
})
export class FacilitiesComponent implements OnInit {

  public facilities: [] = [];
  public perPage: number = 10;
  public currentPage: number = 1;
  public totalEntries: number = 0;

  constructor(
    private facilityService: FacilityService,
  ) {
    this.facilityService.facilities.subscribe(facilities => this.facilities = facilities);

    this.facilityService.facilitiesMeta.subscribe((facilitiesMeta: any) => {
      this.perPage = facilitiesMeta.perPage;
      this.currentPage = facilitiesMeta.currentPage;
      this.totalEntries = facilitiesMeta.totalEntries;
    });
  }

  ngOnInit(): void {
  }

  changePage(page) {
    this.facilityService.changePage(page);
  }

}
