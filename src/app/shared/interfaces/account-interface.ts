import { Observable } from 'rxjs/Observable';

export interface AccountInterface {
  addAccount(name: string, maintaining: number, initial: number, other: number, description: string): Observable<any>;
}
