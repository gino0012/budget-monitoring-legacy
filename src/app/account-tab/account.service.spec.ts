import { TestBed, inject } from '@angular/core/testing';
import { AccountService } from './account.service';
import { GoogleService } from '../shared/services/google/google.service';
import { MockGoogleService } from '../shared/test/mocks/mock-google-service';
import { AccountInterface } from '../shared/interfaces/account-interface';
import { UserDataService } from '../shared/services/user/user-data.service';
import { MockUserDataService } from '../shared/test/mocks/mock-user-data-service';
import { Constants } from '../shared/constants/constants';
import { Observable } from 'rxjs/Observable';
import { AlertService } from '../shared/services/alert.service';
import { MockAlertService } from '../shared/test/mocks/mock-alert-service';

describe('AccountService', () => {
  const mockAccessToken = 'sample-access-token123';
  const mockDataId = 'sample-data-id';
  let service: AccountInterface,
    mockGoogleService: MockGoogleService,
    mockUserData: MockUserDataService,
    mockAlertService: MockAlertService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AccountService,
        Constants,
        { provide: GoogleService, useClass: MockGoogleService },
        { provide: UserDataService, useClass: MockUserDataService },
        { provide: AlertService, useClass: MockAlertService }
      ]
    });
  });

  beforeEach(inject([AccountService, GoogleService, UserDataService, AlertService],
    (_service_, _mockGoogleService_, _mockUserData_, _mockAlertService_) => {
      service = _service_;
      mockGoogleService = _mockGoogleService_;
      mockUserData = _mockUserData_;
      mockAlertService = _mockAlertService_;
    }));

  describe('addAccount', () => {
    const constants = new Constants();
    const mockMaintaining = 123;
    const mockInitial = 456;
    const mockOther = 789;
    const mockValues = [mockMaintaining, mockInitial, mockOther];
    let addAccountSuccessSpy, addAccountFailedSpy;

    beforeEach(() => {
      addAccountSuccessSpy = jasmine.createSpy('add account success');
      addAccountFailedSpy = jasmine.createSpy('add account failed');
      mockUserData.getAccessToken.and.returnValue(mockAccessToken);
      mockUserData.getDataId.and.returnValue(mockDataId);
    });

    it('should add account', () => {
      const mockRes = {
        spreadsheetid: mockDataId
      };
      mockGoogleService.appendData.and.returnValue(Observable.of(mockRes));

      service.addAccount(mockMaintaining, mockInitial, mockOther)
        .subscribe(addAccountSuccessSpy, addAccountFailedSpy);

      expectAppendDataToHaveBeenCalled();
      expect(mockAlertService.show).toHaveBeenCalledWith('Successfully added');
      expect(addAccountSuccessSpy).toHaveBeenCalledWith(mockRes);
      expect(addAccountFailedSpy).not.toHaveBeenCalled();
    });

    it('should not add account when error occurred', () => {
      const mockErrorRes = {
        message: 'error'
      };
      mockGoogleService.appendData.and.returnValue(Observable.throw(mockErrorRes));

      service.addAccount(mockMaintaining, mockInitial, mockOther)
        .subscribe(addAccountSuccessSpy, addAccountFailedSpy);

      expectAppendDataToHaveBeenCalled();
      expect(mockAlertService.show).toHaveBeenCalledWith(mockErrorRes.message);
      expect(addAccountSuccessSpy).not.toHaveBeenCalled();
      expect(addAccountFailedSpy).toHaveBeenCalledWith(mockErrorRes);
    });

    it('should not add account when timeout occurred', () => {
      mockGoogleService.appendData.and.returnValue(Observable.throw({}));

      service.addAccount(mockMaintaining, mockInitial, mockOther)
        .subscribe(addAccountSuccessSpy, addAccountFailedSpy);

      expectAppendDataToHaveBeenCalled();
      expect(mockAlertService.show).toHaveBeenCalledWith('Error occurred while adding Account');
      expect(addAccountSuccessSpy).not.toHaveBeenCalled();
      expect(addAccountFailedSpy).toHaveBeenCalledWith({});
    });

    function expectAppendDataToHaveBeenCalled() {
      expect(mockUserData.getAccessToken).toHaveBeenCalled();
      expect(mockUserData.getDataId).toHaveBeenCalled();
      expect(mockGoogleService.appendData).toHaveBeenCalledWith(mockAccessToken, mockDataId,
        constants.SHEET_NAME.ACCOUNTS, mockValues);
    }
  });
});
