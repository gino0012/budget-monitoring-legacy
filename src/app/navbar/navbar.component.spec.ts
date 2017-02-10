/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { NavbarComponent } from './navbar.component';
import { HtmlElementUtils } from '../utils/html-element-utils';

describe('NavbarComponent', () => {
  const TITLE = 'Budget Monitoring';
  const BUDGET_TAB = 'Budgets';
  const ADD_BUTTON = {
    nav: 'add',
    sideNav: 'Add New Budget'
  }
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;
  let compiled: HTMLNode;
  let htmlElementUtils: HtmlElementUtils;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavbarComponent ]
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
    expect(component.TITLE).toBe(TITLE);
    expect(htmlElementUtils.getElementTextContent('.brand-logo')).toBe(TITLE);
  });

  it('should have add button for new budget', () => {
    expect(component.ADD_BUTTON).toEqual(ADD_BUTTON);
    expect(htmlElementUtils.getElementTextContent('ul#nav-mobile .material-icons')).toBe(ADD_BUTTON.nav);
    expect(htmlElementUtils.getElementTextContent('ul.side-nav a')).toBe(ADD_BUTTON.sideNav);
  });

  it('should have budget tab', () => {
    expect(component.BUDGET_TAB).toBe(BUDGET_TAB);
    expect(htmlElementUtils.getElementTextContent('div.nav-content>ul>li.tab>a')).toBe(BUDGET_TAB);
  });
});
