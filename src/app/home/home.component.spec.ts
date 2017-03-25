import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MaterialModule } from '@angular/material';

import { Observable } from 'rxjs/Observable';

import { HomeComponent } from './home.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { LoaderBlueComponent } from '../shared/loaders/loader-blue/loader-blue.component';

import { BudgetService } from '../shared/services/budget.service';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let mockBudgetService;

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
        LoaderBlueComponent
      ],
      providers: [{ provide: BudgetService, useValue: mockBudgetService }]
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    component.isInitializing = false;
    fixture.detectChanges();
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

  it('should initialize data', async(() => {
    expect(mockBudgetService.initializeDataOnStartup).toHaveBeenCalled();
  }));
});
