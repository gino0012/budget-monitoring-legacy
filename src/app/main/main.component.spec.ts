import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MaterialModule } from '@angular/material';

import { Observable } from 'rxjs/Observable';

import { LoaderBlueComponent } from '../shared/loaders/loader-blue/loader-blue.component';
import { MainComponent } from './main.component';
import { AccountTabComponent } from '../account-tab/account-tab.component';

import { BudgetService } from '../shared/services/budget.service';
import { AccountService } from '../account-tab/account.service';
import { AlertService } from '../shared/services/alert.service';
import { MockAccountService } from '../shared/test/mocks/mock-account-service';
import { MockAlertService } from '../shared/test/mocks/mock-alert-service';

describe('MainComponent', () => {
  let component: MainComponent;
  let fixture: ComponentFixture<MainComponent>;
  let mockBudgetService;

  beforeEach(async(() => {
    mockBudgetService = {
      initializeDataOnStartup: jasmine.createSpy('initializeDataOnStartup').and
        .returnValue(Observable.of({}))
    };

    TestBed.configureTestingModule({
      imports: [MaterialModule],
      declarations: [
        MainComponent,
        AccountTabComponent,
        LoaderBlueComponent
      ],
      providers: [
        { provide: BudgetService, useValue: mockBudgetService },
        { provide: AccountService, useClass: MockAccountService },
        { provide: AlertService, useClass: MockAlertService}
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(MainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize data', async(() => {
    expect(mockBudgetService.initializeDataOnStartup).toHaveBeenCalled();
    expect(component.isInitializing).toBe(false);
  }));
});
