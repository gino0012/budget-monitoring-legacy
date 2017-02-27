import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpModule } from '@angular/http';
import { Router } from '@angular/router';

import { GoogleApiService } from '../shared/services/google-api.service';
import { UserDataService } from '../shared/services/user-data.service';

import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let isLoginSpy, navigateSpy;

  beforeEach(async(() => {
    compileModule(false);
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not redirect to home page if not authenticated', async(() => {
    expect(isLoginSpy).toHaveBeenCalled();
    expect(navigateSpy).not.toHaveBeenCalled();
  }));

  it('should redirect to login if not authenticated', async(() => {
    TestBed.resetTestingModule();
    compileModule(true);

    expect(isLoginSpy).toHaveBeenCalled();
    expect(navigateSpy).toHaveBeenCalledWith(['/home']);
  }));

  function compileModule(isLogin) {
    isLoginSpy = jasmine.createSpy('is login').and.returnValue(isLogin);
    navigateSpy = jasmine.createSpy('navigate');
    const mockRouter = { navigate: navigateSpy };
    const mockUserDataService = { isLogin: isLoginSpy };

    TestBed.configureTestingModule({
      imports: [HttpModule],
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
