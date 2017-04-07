import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MaterialModule, MdDialogRef } from '@angular/material';

import { AddNewAccountComponent } from './add-new-account.component';

describe('AddNewAccountComponent', () => {
  let component: AddNewAccountComponent;
  let fixture: ComponentFixture<AddNewAccountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ MaterialModule ],
      declarations: [ AddNewAccountComponent ],
      providers: [
        { provide: MdDialogRef, useValue: {} }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNewAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
