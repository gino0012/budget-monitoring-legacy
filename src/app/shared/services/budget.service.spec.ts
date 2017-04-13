import { TestBed, inject } from '@angular/core/testing';

import { Observable } from 'rxjs/Observable';

import { Constants } from '../constants/constants';
import { GoogleService } from './google/google.service';
import { MockGoogleService } from '../test/mocks/mock-google-service';
import { BudgetService } from './budget.service';
import { UserDataService } from './user/user-data.service';
import { MockUserDataService } from '../test/mocks/mock-user-data-service';
import { AlertService } from './alert.service';
import { MockAlertService } from '../test/mocks/mock-alert-service';

describe('BudgetService', () => {
  const mockAccessToken = 'sample-access-token123';
  const mockSpreadsheetId = 'sample-id123';
  const mockGetIdRes = {
    id: mockSpreadsheetId
  };
  const mockCreateRes = {
    spreadsheetid: mockSpreadsheetId
  };
  const mockConstants = {
    DATA_FILE_NAME: 'data-file-name'
  };
  let service: BudgetService,
    mockGoogleService: MockGoogleService,
    mockUserDataService: MockUserDataService,
    mockAlertService: MockAlertService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        BudgetService,
        Constants,
        { provide: Constants, useValue: mockConstants },
        { provide: UserDataService, useClass: MockUserDataService },
        { provide: GoogleService, useClass: MockGoogleService },
        { provide: AlertService, useClass: MockAlertService }
      ]
    });
  });

  beforeEach(inject([BudgetService, UserDataService, GoogleService, AlertService],
   (_service_, _mockUserDataService_, _mockGoogleService_, _mockAlertService_) => {
     service = _service_;
     mockUserDataService = _mockUserDataService_;
     mockGoogleService = _mockGoogleService_;
     mockAlertService = _mockAlertService_;

     mockUserDataService.getAccessToken.and.returnValue(mockAccessToken);
   }));

  describe('initializeDataOnStartup', () => {
    let initializeSuccessSpy, initializeFailedSpy;

    beforeEach(() => {
     initializeSuccessSpy = jasmine.createSpy('initializeSuccessSpy');
     initializeFailedSpy = jasmine.createSpy('initializeFailedSpy');
    });

    it('should create spreadsheet when no existing data', () => {
      mockGoogleService.getSpreadsheetIdByName.and.returnValue(Observable.of({}));
      mockGoogleService.createSpreadsheet.and.returnValue(Observable.of(mockCreateRes));

      service.initializeDataOnStartup().subscribe(initializeSuccessSpy, initializeFailedSpy);

      expect(mockUserDataService.getAccessToken).toHaveBeenCalled();
      expect(mockGoogleService.getSpreadsheetIdByName)
        .toHaveBeenCalledWith(mockAccessToken, mockConstants.DATA_FILE_NAME);
      expect(mockGoogleService.createSpreadsheet).toHaveBeenCalledWith(mockAccessToken, mockConstants.DATA_FILE_NAME);
      expect(mockUserDataService.setDataId).toHaveBeenCalledWith(mockSpreadsheetId);
      expect(initializeSuccessSpy).toHaveBeenCalled();
      expect(initializeFailedSpy).not.toHaveBeenCalled();
    });

    it('should not create spreadsheet when has existing data', () => {
      mockGoogleService.getSpreadsheetIdByName.and.returnValue(Observable.of(mockGetIdRes));

      service.initializeDataOnStartup().subscribe(initializeSuccessSpy, initializeFailedSpy);

      expect(mockUserDataService.getAccessToken).toHaveBeenCalled();
      expect(mockGoogleService.getSpreadsheetIdByName)
        .toHaveBeenCalledWith(mockAccessToken, mockConstants.DATA_FILE_NAME);
      expect(mockGoogleService.createSpreadsheet).not.toHaveBeenCalled();
      expect(mockUserDataService.setDataId).toHaveBeenCalledWith(mockSpreadsheetId);
      expect(initializeSuccessSpy).toHaveBeenCalled();
      expect(initializeFailedSpy).not.toHaveBeenCalled();
    });

    it('should show error alert when initialization failed', () => {
      mockGoogleService.getSpreadsheetIdByName.and.returnValue(Observable.throw({}));

      service.initializeDataOnStartup().subscribe(initializeSuccessSpy, initializeFailedSpy);

      expect(initializeSuccessSpy).not.toHaveBeenCalled();
      expect(initializeFailedSpy).toHaveBeenCalledWith({});
      expect(mockAlertService.show).toHaveBeenCalledWith('Error Initializing Data');
    });

    it('should show error alert when initialization failed with error message', () => {
      const errorRes = {
        message: 'error message'
      };
      mockGoogleService.getSpreadsheetIdByName.and.returnValue(Observable.throw(errorRes));

      service.initializeDataOnStartup().subscribe(initializeSuccessSpy, initializeFailedSpy);

      expect(initializeSuccessSpy).not.toHaveBeenCalled();
      expect(initializeFailedSpy).toHaveBeenCalledWith(errorRes);
      expect(mockAlertService.show).toHaveBeenCalledWith(errorRes.message);
    });
  });
});

