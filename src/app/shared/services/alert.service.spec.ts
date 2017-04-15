import { TestBed, inject } from '@angular/core/testing';
import { AlertService } from './alert.service';
import { MdSnackBar, MdSnackBarConfig } from '@angular/material';
import { MockMdSnackBar } from '../test/mocks/mock-md-snack-bar';

describe('AlertService', () => {
  const mockMessage = 'sample message';
  let service, mockMdSnackBar;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AlertService,
        { provide: MdSnackBar, useClass: MockMdSnackBar}
      ]
    });
  });

  beforeEach(inject([AlertService, MdSnackBar],
    (_service_, _mockMdSnackBar_) => {
      service = _service_;
      mockMdSnackBar = _mockMdSnackBar_;
    }));

  describe('show', () => {
    it('should show alert message', () => {
      const config = new MdSnackBarConfig;
      config.duration = 5000;

      service.show(mockMessage);

      expect(mockMdSnackBar.open).toHaveBeenCalledWith(mockMessage, null, config);
    });
  });

  describe('display', () => {
    it('should display alert message', () => {
      service.display(mockMessage);

      expect(mockMdSnackBar.open).toHaveBeenCalledWith(mockMessage);
    });
  });

  describe('hide', () => {
    it('should hide alert message', () => {
      const mockMockMdSnackBarRef = {
        dismiss: jasmine.createSpy('snack bar ref dismiss')
      };
      mockMdSnackBar.open.and.returnValue(mockMockMdSnackBarRef);

      service.display(mockMessage);
      service.hide();

      expect(mockMdSnackBar.open).toHaveBeenCalledWith(mockMessage);
      expect(mockMockMdSnackBarRef.dismiss).toHaveBeenCalled();
    });
  });
});
