/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AddNewBudgetComponent } from './add-new-budget.component';
import { HtmlElementUtils } from '../../../shared/utils/html-element-utils';

describe('AddNewBudgetComponent', () => {
  let component: AddNewBudgetComponent;
  let fixture: ComponentFixture<AddNewBudgetComponent>;
  let htmlElementUtils: HtmlElementUtils;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddNewBudgetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNewBudgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    htmlElementUtils = new HtmlElementUtils(fixture.debugElement.nativeElement);
  });

  it('should have modal class', () => {
    expect(htmlElementUtils.getElementNode('.modal')).not.toBeNull();
  });

  it('should have modal id', () => {
    expect(htmlElementUtils.getElementNode('#modal1')).not.toBeNull();
  });

  it('should have modal content', () => {
    expect(htmlElementUtils.getElementNode('.modal-content')).not.toBeNull();
  });

  describe('when in footer', () => {
    it('should have close button', () => {
      expect(htmlElementUtils.getElementTextContent('.modal-footer>a')).toBe('Close');
    });

  });
});
