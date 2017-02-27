/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpModule } from '@angular/http';
import { Router } from '@angular/router';

import { GoogleApiService } from '../shared/services/google-api.service';
import { UserDataService } from '../shared/services/user-data.service';

import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let navigateSpy;

  beforeEach(async(() => {
    navigateSpy = jasmine.createSpy('navigate');
    const mockRouter = {
      navigate: navigateSpy
    };

    TestBed.configureTestingModule({
      imports: [HttpModule],
      declarations: [ LoginComponent ],
      providers: [GoogleApiService, UserDataService,
        { provide: Router, useValue: mockRouter }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
