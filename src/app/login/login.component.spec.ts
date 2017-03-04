import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';

import { Observable } from 'rxjs/Rx';

import { LoginComponent } from './login.component';

import { GoogleApiService } from '../shared/services/google/google-api.service';
import { UserDataService } from '../shared/services/user-data.service';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let mockUserDataService, mockRouter;

  beforeEach(async(() => {
    compileModule(false);
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not redirect to home page if not authenticated', async(() => {
    expect(mockUserDataService.isLogin).toHaveBeenCalled();
    expect(mockRouter.navigate).not.toHaveBeenCalled();
  }));

  it('should redirect to home page if authenticated', async(() => {
    TestBed.resetTestingModule();
    compileModule(true);

    expect(mockUserDataService.isLogin).toHaveBeenCalled();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/home']);
  }));

  function compileModule(isLogin) {
    mockRouter = {
      navigate: jasmine.createSpy('navigate')
    };
    mockUserDataService = {};
    mockUserDataService.isLogin = jasmine.createSpy('is login').and.returnValue(Observable.of(isLogin));
    if (!isLogin) {
      mockUserDataService.isLogin = jasmine.createSpy('is login').and.returnValue(Observable.throw(false));
    }

    TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      providers: [GoogleApiService,
        { provide: UserDataService, useValue: mockUserDataService },
        { provide: Router, useValue: mockRouter }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }
});
