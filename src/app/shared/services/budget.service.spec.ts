import { TestBed, inject } from '@angular/core/testing';

import { Observable } from 'rxjs/Observable';

import { Constants } from '../constants/constants';
import { GoogleService } from './google/google.service';
import { UserDataService } from './user-data.service';

import { BudgetService } from './budget.service';

describe('BudgetService', () => {
  const mockAccessToken = 'sample-access-token123';
  const mockConstants = {
    DATA_FILE_NAME: 'data-file-name'
  };
  let mockGoogleService, mockUserDataService;

  beforeEach(() => {
    compileModule({});
  });

  describe('initializeData()', () => {
    it('should create spreadsheet when no existing data',
      inject([BudgetService], (service: BudgetService) => {
        service.initializeDataOnStartup();

        expect(mockUserDataService.getAccessToken).toHaveBeenCalled();
        expect(mockGoogleService.getSpreadsheetIdByName)
          .toHaveBeenCalledWith(mockAccessToken, mockConstants.DATA_FILE_NAME);
        expect(mockGoogleService.createSpreadsheet)
          .toHaveBeenCalledWith(mockAccessToken);
      }));

    xit('should not create spreadsheet when has existing data',
      inject([BudgetService], (service: BudgetService) => {
        TestBed.resetTestingModule();
        compileModule({
          id: '123456qwerty'
        });

        service.initializeDataOnStartup();

        expect(mockUserDataService.getAccessToken).toHaveBeenCalled();
        expect(mockGoogleService.getSpreadsheetIdByName)
          .toHaveBeenCalledWith(mockAccessToken, mockConstants.DATA_FILE_NAME);
        expect(mockGoogleService.createSpreadsheet).not.toHaveBeenCalled();
      }));
  });

  function compileModule(getSpreadsheetIdRes) {
    mockUserDataService = {
      getAccessToken: jasmine.createSpy('getAccessToken').and.returnValue(mockAccessToken)
    };
    mockGoogleService = {
      getSpreadsheetIdByName: jasmine.createSpy('getSpreadsheetIdByName').and
        .returnValue(Observable.of(getSpreadsheetIdRes)),
      createSpreadsheet: jasmine.createSpy('createSpreadsheet').and
        .returnValue(Observable.of({}))
    };

    TestBed.configureTestingModule({
      providers: [BudgetService, Constants,
        {provide: Constants, useValue: mockConstants},
        {provide: UserDataService, useValue: mockUserDataService},
        {provide: GoogleService, useValue: mockGoogleService}
      ]
    });
  }
});

