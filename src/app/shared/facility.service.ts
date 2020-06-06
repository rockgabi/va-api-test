import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FacilityService {

  facilities: BehaviorSubject<[]> = new BehaviorSubject([]);
  perPage: number = 10;
  currentPage: number = 1;
  totalPages: number = 0;
  totalEntries: number = 0;
  state: string = 'FL';

  facilitiesMeta: BehaviorSubject<{}> = new BehaviorSubject({});

  constructor(
    private http: HttpClient,
  ) {
    this.fetch();
  }

  fetch(currentPage = this.currentPage, perPage = this.perPage, state = this.state) {
    const data = { page: currentPage.toString(), per_page: perPage.toString(), state };

    return new Promise((res, rej) => {
      this.http.get('https://sandbox-api.va.gov/services/va_facilities/v0/facilities',
        { params: data, headers: { apiKey: 'f4bnZytpOAo62ioORPfDyR9SLD61eFXx' } })
        .subscribe((resp: any) => {
          this.facilities.next(resp.data);
          this.nextMeta(resp.meta.pagination.current_page, resp.meta.pagination.per_page, resp.meta.pagination.total_entries);

          res(resp.data);
        });
    });
  }

  public changePage(page) {
    this.fetch(page);
  }

  private nextMeta(
    currentPage = this.currentPage,
    perPage = this.perPage,
    totalEntries = this.totalEntries,
    state = this.state,
  ) {
    this.currentPage = currentPage;
    this.perPage = perPage;
    this.totalEntries = totalEntries;
    this.state = state;

    this.facilitiesMeta.next({
      perPage, currentPage, totalEntries,
    });
  }
}
