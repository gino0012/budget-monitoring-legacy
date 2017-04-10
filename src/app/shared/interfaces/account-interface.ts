import { Observable } from 'rxjs/Observable';

export interface AccountInterface {
  addAccount(maintaining: number, initial: number, other: number): Observable<any>;
}
