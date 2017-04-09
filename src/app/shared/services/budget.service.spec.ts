import { TestBed, inject } from '@angular/core/testing';

import { Observable } from 'rxjs/Observable';

import { Constants } from '../constants/constants';
import { GoogleService } from './google/google.service';
import { MockGoogleService } from '../test/mocks/mock-google-service';
import { BudgetService } from './budget.service';
import { UserDataService } from './user/user-data.service';
import { MockUserDataService } from '../test/mocks/mock-user-data-service';

describe('BudgetService', () => {
  const mockAccessToken = 'sample-access-token123';
  const mockGetIdRes = {
    id: 'sample-id123'
  };
  const mockCreateRes = {
    spreadsheetid: '12345-qwerty'
  };
  const mockConstants = {
    DATA_FILE_NAME: 'data-file-name'
  };
  let service, mockGoogleService, mockUserDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BudgetService, Constants,
        {provide: Constants, useValue: mockConstants},
        {provide: UserDataService, useClass: MockUserDataService},
        {provide: GoogleService, useClass: MockGoogleService}
      ]
    });
  });

  beforeEach(inject([BudgetService, UserDataService, GoogleService],
   (_service_, _mockUserDataService_, _mockGoogleService_) => {
     service = _service_;
     mockUserDataService = _mockUserDataService_;
     mockGoogleService = _mockGoogleService_;

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
        expect(initializeSuccessSpy).toHaveBeenCalled();
        expect(initializeFailedSpy).not.toHaveBeenCalled();
      });
  });
});

