import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';

import { LoginComponent } from './login.component';

import { GoogleApiService } from '../shared/services/google/google-api.service';
import { UserService } from '../shared/services/user/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MockActivatedRoute } from '../shared/test/mocks/mock-activated-route';
import { MockRouter } from '../shared/test/mocks/mock-router';
import { Observable } from 'rxjs/Observable';
import { MockUserService } from '../shared/test/mocks/mock-user-service';
import { LocationService } from '../shared/service/location.service';
import { MockLocationService } from '../shared/test/mocks/mock-location-service';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let mockActivatedRoute, mockUserService, mockRouter, mockLocationService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      providers: [GoogleApiService,
        { provide: UserService, useClass: MockUserService },
        { provide: ActivatedRoute, useClass: MockActivatedRoute },
        { provide: Router, useClass: MockRouter },
        { provide: LocationService, useClass: MockLocationService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  beforeEach(inject([ActivatedRoute, UserService, Router, LocationService],
    (_mockActivatedRoute_, _mockUserService_, _mockRouter_, _mockLocationService_) => {
      mockActivatedRoute = _mockActivatedRoute_;
      mockUserService = _mockUserService_;
      mockRouter = _mockRouter_;
      mockLocationService = _mockLocationService_;
    }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should authenticate user', () => {
    const mockParams = {
      code: 'sample-code-123ty'
    };
    mockActivatedRoute.snapshot.data['isAuthenticated'] = false;
    mockActivatedRoute.queryParams = Observable.of(mockParams);

    component.ngOnInit();

    expect(mockUserService.login).toHaveBeenCalledWith(mockParams);
  });

  it('should navigate to home if already authenticated', () => {
    mockActivatedRoute.snapshot.data['isAuthenticated'] = true;
    mockActivatedRoute.queryParams = Observable.of({});

    component.ngOnInit();

    expect(mockRouter.navigate).toHaveBeenCalledWith(['/home']);
  });

  it('should navigate to home if already authenticated', () => {
    mockActivatedRoute.snapshot.data['isAuthenticated'] = false;
    mockActivatedRoute.queryParams = Observable.of({});

    component.ngOnInit();

    expect(mockLocationService.navigate).toHaveBeenCalledWith('https://accounts.google.com/o/oauth2/v2/auth' +
      '?scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fdrive.metadata.readonly' +
      '&access_type=offline&include_granted_scopes=false&redirect_uri=http%3A%2F%2Flocalhost%3A4200%2Flogin' +
      '&response_type=code&client_id=861770303263-nhmpmupmg7je2d3u76714ij8dun527up.apps.googleusercontent.com');
  });
});
