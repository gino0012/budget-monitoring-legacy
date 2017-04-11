import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { MaterialModule, MdDialogRef } from '@angular/material';

import { AddNewAccountComponent } from './add-new-account.component';
import { MockMdDialogRef } from '../../test/mocks/mock-md-dialog-ref';

describe('AddNewAccountComponent', () => {
  let component: AddNewAccountComponent;
  let fixture: ComponentFixture<AddNewAccountComponent>;
  let mockMdDialogRef;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule, MaterialModule ],
      declarations: [ AddNewAccountComponent ],
      providers: [
        { provide: MdDialogRef, useClass: MockMdDialogRef }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AddNewAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  beforeEach(inject([MdDialogRef],
    (_mockMdDialogRef_) => {
      mockMdDialogRef = _mockMdDialogRef_;
    }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('addAccount', () => {
    const mockValues = {
      maintaining: 100,
      initial: 200,
      other: 300
    };

    it('should add account', () => {
      component.maintaining = mockValues.maintaining;
      component.initial = mockValues.initial;
      component.other = mockValues.other;
      fixture.detectChanges();

      component.addAccount();

      expect(mockMdDialogRef.close).toHaveBeenCalledWith(mockValues);
    });
  });
});
