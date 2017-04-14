import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';

import { LoginComponent } from './login.component';

import { GoogleApiService } from '../shared/services/google/google-api.service';
import { UserService } from '../shared/services/user/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MockActivatedRoute } from '../shared/test/mocks/mock-activated-route';
import { MockRouter } from '../shared/test/mocks/mock-router';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let mockActivatedRoute;

  beforeEach(async(() => {
    const mockUserService = {};

    TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      providers: [GoogleApiService,
        { provide: UserService, useValue: mockUserService },
        { provide: ActivatedRoute, useClass: MockActivatedRoute },
        { provide: Router, useClass: MockRouter }
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  beforeEach(inject([ActivatedRoute], (_mockActivatedRoute_) => {
    mockActivatedRoute = _mockActivatedRoute_;

    mockActivatedRoute.snapshot.data['isAuthenticated'] = true;
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
