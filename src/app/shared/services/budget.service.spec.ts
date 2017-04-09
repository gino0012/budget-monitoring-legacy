import { TestBed, inject } from '@angular/core/testing';

import { Observable } from 'rxjs/Observable';

import { Constants } from '../constants/constants';
import { GoogleService } from './google/google.service';
import { UserService } from './user/user.service';

import { MockGoogleService } from '../test/mocks/mock-google-service';
import { MockUserService } from '../test/mocks/mock-user-service';

import { BudgetService } from './budget.service';

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
  let service, mockGoogleService, mockUserService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BudgetService, Constants,
        {provide: Constants, useValue: mockConstants},
        {provide: UserService, useClass: MockUserService},
        {provide: GoogleService, useClass: MockGoogleService}
      ]
    });
  });

  beforeEach(inject([BudgetService, UserService, GoogleService],
   (_service_, _mockUserService_, _mockGoogleService_) => {
     service = _service_;
     mockUserService = _mockUserService_;
     mockGoogleService = _mockGoogleService_;

     mockUserService.getAccessToken.and.returnValue(mockAccessToken);
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

        expect(mockUserService.getAccessToken).toHaveBeenCalled();
        expect(mockGoogleService.getSpreadsheetIdByName)
          .toHaveBeenCalledWith(mockAccessToken, mockConstants.DATA_FILE_NAME);
        expect(mockGoogleService.createSpreadsheet).toHaveBeenCalledWith(mockAccessToken, mockConstants.DATA_FILE_NAME);
        expect(initializeSuccessSpy).toHaveBeenCalled();
        expect(initializeFailedSpy).not.toHaveBeenCalled();
      });

    it('should not create spreadsheet when has existing data', () => {
        mockGoogleService.getSpreadsheetIdByName.and.returnValue(Observable.of(mockGetIdRes));

        service.initializeDataOnStartup().subscribe(initializeSuccessSpy, initializeFailedSpy);

        expect(mockUserService.getAccessToken).toHaveBeenCalled();
        expect(mockGoogleService.getSpreadsheetIdByName)
          .toHaveBeenCalledWith(mockAccessToken, mockConstants.DATA_FILE_NAME);
        expect(mockGoogleService.createSpreadsheet).not.toHaveBeenCalled();
        expect(initializeSuccessSpy).toHaveBeenCalled();
        expect(initializeFailedSpy).not.toHaveBeenCalled();
      });
  });
});

