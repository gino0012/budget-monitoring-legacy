import { TestBed, inject } from '@angular/core/testing';
import { AlertService } from './alert.service';
import { MdSnackBar, MdSnackBarConfig } from '@angular/material';
import { MockMdSnackBar } from '../test/mocks/mock-md-snack-bar';

describe('AlertService', () => {
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
      const message = 'sample message';
      const config = new MdSnackBarConfig;
      config.duration = 5;

      service.show(message);

      expect(mockMdSnackBar.open).toHaveBeenCalledWith(message, null, config);
    });
  });
});
