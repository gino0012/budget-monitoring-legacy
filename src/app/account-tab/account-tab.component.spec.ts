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
      name: 'account name',
      maintaining: 100,
      initial: 200,
      other: 300,
      description: 'description'
    };
    let mockMdDialogRef;

    beforeEach(() => {
      mockMdDialogRef = new MockMdDialogRef;
    });

    it('should add account after dialog close', () => {
      setupMdDialogRefToReturn(mockValues);
      mockAccountService.addAccount.and.returnValue(Observable.of({}));

      component.openDialog();

      expect(mockMdDialog.open).toHaveBeenCalled();
      expect(mockMdDialogRef.afterClosed).toHaveBeenCalled();
      expect(mockAccountService.addAccount).toHaveBeenCalledWith(
        mockValues.name,
        mockValues.maintaining,
        mockValues.initial,
        mockValues.other,
        mockValues.description
      );
    });

    it('should not add account after dialog close when no values', () => {
      setupMdDialogRefToReturn(undefined);
      mockAccountService.addAccount.and.returnValue(Observable.of({}));

      component.openDialog();

      expect(mockMdDialog.open).toHaveBeenCalled();
      expect(mockMdDialogRef.afterClosed).toHaveBeenCalled();
      expect(mockAccountService.addAccount).not.toHaveBeenCalled();
    });

    function setupMdDialogRefToReturn(value) {
      mockMdDialogRef.afterClosed.and.returnValue(Observable.of(value));
      mockMdDialog.open.and.returnValue(mockMdDialogRef);
    }
  });
});
