import { Observable } from 'rxjs/Observable';

export interface UserInterface {
  login(googleUser): void;
  isLogin(): Observable<boolean>;
}
