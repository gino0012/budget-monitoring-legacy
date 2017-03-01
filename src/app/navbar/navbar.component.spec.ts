import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpModule } from '@angular/http';
import { Router } from '@angular/router';

import { NavbarComponent } from './navbar.component';
import { AddNewBudgetComponent } from '../shared/modals/add-new-budget/add-new-budget.component';

import { GoogleApiService } from '../shared/services/google-api.service';
import { UserDataService } from '../shared/services/user-data.service';
import { HtmlElementUtils } from '../shared/utils/html-element-utils';
import { Constants } from '../shared/constants/constants';

describe('NavbarComponent', () => {
  const TITLE = 'Budget Monitoring';
  const BUDGET_TAB = 'Budgets';
  const ADD_BUTTON = {
    nav: 'add',
    id: new Constants().ADD_BUDGET_ID,
    sideNav: 'Add New Budget'
  };
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;
  let htmlElementUtils: HtmlElementUtils;
  let logoutSpy, navigateSpy;

  beforeEach(async(() => {
    logoutSpy = jasmine.createSpy('logout');
    navigateSpy = jasmine.createSpy('navigate');
    const mockRouter = { navigate: navigateSpy };
    const mockUserDataService = { logout: logoutSpy};
    TestBed.configureTestingModule({
      declarations: [
        NavbarComponent,
        AddNewBudgetComponent
      ],
      imports: [HttpModule],
      providers: [GoogleApiService,
        { provide: UserDataService, useValue: mockUserDataService },
        { provide: Router, useValue: mockRouter }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    htmlElementUtils = new HtmlElementUtils(fixture.debugElement.nativeElement);
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have correct title', () => {
  });

  it('should have title in brand logo', () => {
    expect(component.title).toBe(TITLE);
    expect(htmlElementUtils.getElementTextContent('.brand-logo')).toBe(TITLE);
  });

  it('should have add button for new budget', () => {
    expect(component.addButton).toEqual(ADD_BUTTON);
    expect(htmlElementUtils.getElementTextContent('ul#nav-mobile .material-icons')).toBe(ADD_BUTTON.nav);
    expect(htmlElementUtils.getElementTextContent('ul.side-nav a')).toBe(ADD_BUTTON.sideNav);
  });

  it('should have budget tab', () => {
    expect(component.budgetTab).toBe(BUDGET_TAB);
    expect(htmlElementUtils.getElementTextContent('div.nav-content>ul>li.tab>a')).toBe(BUDGET_TAB);
  });
/*
  it('should logout', () => {
    component.logout();

    expect(logoutSpy).toHaveBeenCalled();
    expect(navigateSpy).toHaveBeenCalledWith(['/login']);
  });*/
});
