import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';

import { GoogleApiService } from '../shared/services/google/google-api.service';
import { UserDataService } from '../shared/services/user-data.service';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async(() => {
    const mockUserDataService = {};

    TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      providers: [GoogleApiService,
        { provide: UserDataService, useValue: mockUserDataService }
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
