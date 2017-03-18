import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainComponent } from './home.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';
import { AddNewBudgetComponent } from '../shared/modals/add-new-budget/add-new-budget.component';

import { BudgetService } from '../shared/services/budget.service';


describe('MainComponent', () => {
  let component: MainComponent;
  let fixture: ComponentFixture<MainComponent>;
  let mockBudgetService;

  beforeEach(async(() => {
    mockBudgetService = {
      initializeDataOnStartup: jasmine.createSpy('initializeDataOnStartup')
    };

    TestBed.configureTestingModule({
      declarations: [
        MainComponent,
        NavbarComponent,
        FooterComponent,
        AddNewBudgetComponent
      ],
      providers: [{ provide: BudgetService, useValue: mockBudgetService }]
    }).compileComponents();

    fixture = TestBed.createComponent(MainComponent);
    component = fixture.componentInstance;
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

  it('should have footer', async(() => {
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('footer')).not.toBeNull();
  }));

  it('should initialize data', async(() => {
    expect(mockBudgetService.initializeDataOnStartup).toHaveBeenCalled();
  }));
});
