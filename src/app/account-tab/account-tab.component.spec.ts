import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MaterialModule } from '@angular/material';

import { AccountTabComponent } from './account-tab.component';
import { AddNewAccountComponent } from '../shared/modals/add-new-account/add-new-account.component';

describe('AccountTabComponent', () => {
  let component: AccountTabComponent;
  let fixture: ComponentFixture<AccountTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ MaterialModule ],
      declarations: [
        AccountTabComponent,
        AddNewAccountComponent
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
