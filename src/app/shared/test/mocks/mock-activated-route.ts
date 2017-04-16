import { Observable } from 'rxjs/Observable';

export class MockActivatedRoute {
  snapshot = {
    data : {}
  };
  queryParams = Observable.of({});
}
