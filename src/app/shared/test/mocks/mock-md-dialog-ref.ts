export class MockMdDialogRef {
  close = jasmine.createSpy('close');
  afterClosed = jasmine.createSpy('after closed');
}
