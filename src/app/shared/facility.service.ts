import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { environment as env } from 'src/environments/environment';

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

  /**
   * Fetches the paginated list of facilities, and stores that in a BehaviorSubject for notifying observers
   *
   * @param currentPage
   * @param perPage
   */
  fetch(currentPage = this.currentPage, perPage = this.perPage) {
    const data = { page: currentPage.toString(), per_page: perPage.toString(), state: this.state };

    return new Promise((res, rej) => {
      this.http.get(env.apiBaseUrl + 'services/va_facilities/v0/facilities',
        { params: data, headers: { apiKey: env.apiKey } })
        .subscribe((resp: any) => {
          this.facilities.next(resp.data);
          this.nextMeta(resp.meta.pagination.current_page, resp.meta.pagination.per_page, resp.meta.pagination.total_entries);

          res(resp.data);
        });
    });
  }


  /**
   * Fetches the data for a single facility, it is not stored, just returned by the promise
   *
   * @param id
   */
  fetchDetails(id) {
    const data = { state: this.state };
    return new Promise((res, rej) => {
      this.http.get(env.apiBaseUrl + 'services/va_facilities/v0/facilities/' + id,
        { params: data, headers: { apiKey: env.apiKey } })
        .subscribe((resp: any) => {
          res(resp.data);
        });
    });
  }

  /**
   * Updates the pagination for the facilities
   *
   * @param page
   */
  public changePage(page) {
    this.fetch(page);
  }

  /**
   * Helper for updating the state of the pagination variables
   * This also notifies to observers that these parameter changed.
   * Useful for using with the pagination component.
   * 
   * @param currentPage 
   * @param perPage 
   * @param totalEntries 
   * @param state 
   */
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
