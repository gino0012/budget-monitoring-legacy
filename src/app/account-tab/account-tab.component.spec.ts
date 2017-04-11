import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { MaterialModule, MdDialog } from '@angular/material';

import { AccountTabComponent } from './account-tab.component';
import { AddNewAccountComponent } from '../shared/modals/add-new-account/add-new-account.component';
import { MockMdDialog } from '../shared/test/mocks/mock-md-dialog';
import { MockMdDialogRef } from '../shared/test/mocks/mock-md-dialog-ref';
import { Observable } from 'rxjs/Observable';
import { AccountService } from './account.service';
import { MockAccountService } from '../shared/test/mocks/mock-account-service';
import { FormsModule } from '@angular/forms';

describe('AccountTabComponent', () => {
  let component: AccountTabComponent;
  let fixture: ComponentFixture<AccountTabComponent>;
  let mockMdDialog, mockAccountService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ MaterialModule, FormsModule ],
      declarations: [
        AccountTabComponent,
        AddNewAccountComponent
      ],
      providers: [
        { provide: MdDialog, useClass: MockMdDialog },
        { provide: AccountService, useClass: MockAccountService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AccountTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  beforeEach(inject([MdDialog, AccountService],
    (_mockMdDialog_, _mockAccountService_) => {
      mockMdDialog = _mockMdDialog_;
      mockAccountService = _mockAccountService_;
    }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('openDialog', () => {
    const mockValues = {
      maintaining: 100,
      initial: 200,
      other: 300
    };
    let mockMdDialogRef;

    beforeEach(() => {
      mockMdDialogRef = new MockMdDialogRef;
      mockAccountService.addAccount.and.returnValue(Observable.of({}));
    });

    it('should add account after dialog close', () => {
      mockMdDialogRef.afterClosed.and.returnValue(Observable.of(mockValues));
      mockMdDialog.open.and.returnValue(mockMdDialogRef);

      component.openDialog();

      expect(mockMdDialog.open).toHaveBeenCalled();
      expect(mockMdDialogRef.afterClosed).toHaveBeenCalled();
      expect(mockAccountService.addAccount).toHaveBeenCalledWith(
        mockValues.maintaining,
        mockValues.initial,
        mockValues.other
      );
    });

    it('should not add account after dialog close when no values', () => {
      mockMdDialogRef.afterClosed.and.returnValue(Observable.of(undefined));
      mockMdDialog.open.and.returnValue(mockMdDialogRef);

      component.openDialog();

      expect(mockMdDialog.open).toHaveBeenCalled();
      expect(mockMdDialogRef.afterClosed).toHaveBeenCalled();
      expect(mockAccountService.addAccount).not.toHaveBeenCalled();
    });
  });
});
