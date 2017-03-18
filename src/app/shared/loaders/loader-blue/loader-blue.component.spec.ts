import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoaderBlueComponent } from './loader-blue.component';

describe('LoaderBlueComponent', () => {
  let component: LoaderBlueComponent;
  let fixture: ComponentFixture<LoaderBlueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoaderBlueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoaderBlueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
