import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewBudgetComponent } from './add-new-budget.component';

describe('AddNewBudgetComponent', () => {
  let component: AddNewBudgetComponent;
  let fixture: ComponentFixture<AddNewBudgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddNewBudgetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddNewBudgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should ...', () => {
    expect(component).toBeTruthy();
  });
});
