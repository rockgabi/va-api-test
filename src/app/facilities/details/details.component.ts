import { Component, OnInit } from '@angular/core';
import { FacilityService } from 'src/app/shared/facility.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  public facility: any = null;

  constructor(
    private route: ActivatedRoute,
    private facilityService: FacilityService,
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.facilityService.fetchDetails(id).then(facility => this.facility = facility);
  }

}
