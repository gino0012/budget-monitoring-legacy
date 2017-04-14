import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { MaterialModule } from '@angular/material';

import { Observable } from 'rxjs/Observable';

import { HomeComponent } from './home.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { MainComponent } from '../main/main.component';
import { LoaderBlueComponent } from '../shared/loaders/loader-blue/loader-blue.component';
import { AccountTabComponent } from '../account-tab/account-tab.component';

import { BudgetService } from '../shared/services/budget.service';
import { AccountService } from '../account-tab/account.service';
import { MockAccountService } from '../shared/test/mocks/mock-account-service';
import { AlertService } from '../shared/services/alert.service';
import { MockAlertService } from '../shared/test/mocks/mock-alert-service';
import { ActivatedRoute, Router } from '@angular/router';
import { MockActivatedRoute } from '../shared/test/mocks/mock-activated-route';
import { MockRouter } from '../shared/test/mocks/mock-router';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let mockBudgetService, mockActivatedRoute;

  beforeEach(async(() => {
    mockBudgetService = {
      initializeDataOnStartup: jasmine.createSpy('initializeDataOnStartup').and
        .returnValue(Observable.of({}))
    };

    TestBed.configureTestingModule({
      imports: [MaterialModule],
      declarations: [
        HomeComponent,
        NavbarComponent,
        MainComponent,
        AccountTabComponent,
        LoaderBlueComponent
      ],
      providers: [
        { provide: AccountService, useClass: MockAccountService},
        { provide: AlertService, useClass: MockAlertService},
        { provide: BudgetService, useValue: mockBudgetService },
        { provide: ActivatedRoute, useClass: MockActivatedRoute },
        { provide: Router, useClass: MockRouter }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  beforeEach(inject([ActivatedRoute], (_mockActivatedRoute_) => {
    mockActivatedRoute = _mockActivatedRoute_;

    mockActivatedRoute.snapshot.data['isAuthenticated'] = false;
  }));

  it('should create the app', async(() => {
    expect(fixture.debugElement.componentInstance).toBeTruthy();
  }));

  it('should have header', async(() => {
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('header')).not.toBeNull();
  }));

  it('should have main content', async(() => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('main')).not.toBeNull();
  }));
});
