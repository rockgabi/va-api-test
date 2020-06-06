# VeteranAffairsFacilities

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 9.0.6.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Routes
- /facilities       list the VA Facilities in Florida with Pagination
- /facilities/:id   Displays the details of a specific facility in a json-viewer component

## 3rd party packages
- ng-bootstrap      for styling
- ngx-json-viewer   for a json-viewer component
- angular-feather   for icons

## Environment file
API base url and key are stored in this file

## Other comments
I decided to keep components pretty dumb, and most of logic can be found in the corresponding FacilityService

For state I used BehaviorSubject which is an subject that replays the current value when subscripted.