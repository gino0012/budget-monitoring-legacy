import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewBudgetComponent } from './add-new-budget.component';
import { HtmlElementUtils } from '../../../shared/utils/html-element-utils';
import { Constants } from '../../../shared/constants/constants';

describe('AddNewBudgetComponent', () => {
  let component: AddNewBudgetComponent;
  let fixture: ComponentFixture<AddNewBudgetComponent>;
  let htmlElementUtils: HtmlElementUtils;
  let constants: Constants;

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
    constants = new Constants();
    htmlElementUtils = new HtmlElementUtils(fixture.debugElement.nativeElement);
  });

  });
});
