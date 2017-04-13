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
import { AlertService } from '../shared/services/alert.service';
import { MockAlertService } from '../shared/test/mocks/mock-alert-service';

describe('AccountTabComponent', () => {
  let component: AccountTabComponent;
  let fixture: ComponentFixture<AccountTabComponent>;
  let mockMdDialog, mockAccountService, mockAlertService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ MaterialModule, FormsModule ],
      declarations: [
        AccountTabComponent,
        AddNewAccountComponent
      ],
      providers: [
        { provide: MdDialog, useClass: MockMdDialog },
        { provide: AccountService, useClass: MockAccountService },
        { provide: AlertService, useClass: MockAlertService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AccountTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  beforeEach(inject([MdDialog, AccountService, AlertService],
    (_mockMdDialog_, _mockAccountService_, _mockAlertService_) => {
      mockMdDialog = _mockMdDialog_;
      mockAccountService = _mockAccountService_;
      mockAlertService = _mockAlertService_;
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
    });

    it('should add account after dialog close', () => {
      setupMdDialogRefToReturn(mockValues);
      mockAccountService.addAccount.and.returnValue(Observable.of({}));

      component.openDialog();

      expectAddAccountToHaveBeenCalled();
      expect(mockAlertService.show).toHaveBeenCalledWith('Successfully added');
    });

    it('should show error alert when add account failed after dialog close', () => {
      const errorRes = {
        message: 'error message'
      };
      setupMdDialogRefToReturn(mockValues);
      mockAccountService.addAccount.and.returnValue(Observable.throw(errorRes));

      component.openDialog();

      expectAddAccountToHaveBeenCalled();
      expect(mockAlertService.show).toHaveBeenCalledWith(errorRes.message);
    });

    it('should show error alert when add account failed without error message', () => {
      setupMdDialogRefToReturn(mockValues);
      mockAccountService.addAccount.and.returnValue(Observable.throw({}));

      component.openDialog();

      expectAddAccountToHaveBeenCalled();
      expect(mockAlertService.show).toHaveBeenCalledWith('Error occurred while adding Account');
    });

    it('should not add account after dialog close when no values', () => {
      setupMdDialogRefToReturn(undefined);
      mockAccountService.addAccount.and.returnValue(Observable.of({}));

      component.openDialog();

      expect(mockMdDialog.open).toHaveBeenCalled();
      expect(mockMdDialogRef.afterClosed).toHaveBeenCalled();
      expect(mockAccountService.addAccount).not.toHaveBeenCalled();
    });

    function expectAddAccountToHaveBeenCalled() {
      expect(mockMdDialog.open).toHaveBeenCalled();
      expect(mockMdDialogRef.afterClosed).toHaveBeenCalled();
      expect(mockAccountService.addAccount).toHaveBeenCalledWith(
        mockValues.maintaining,
        mockValues.initial,
        mockValues.other
      );
    }
    function setupMdDialogRefToReturn(value) {
      mockMdDialogRef.afterClosed.and.returnValue(Observable.of(value));
      mockMdDialog.open.and.returnValue(mockMdDialogRef);
    }
  });
});
