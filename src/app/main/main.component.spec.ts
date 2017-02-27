/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpModule } from '@angular/http';

import { MainComponent } from './main.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';
import { AddNewBudgetComponent } from '../shared/modals/add-new-budget/add-new-budget.component';
import { GoogleApiService } from '../shared/services/google-api.service';
import { UserDataService } from '../shared/services/user-data.service';


describe('MainComponent', () => {
  let component: MainComponent;
  let fixture: ComponentFixture<MainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        MainComponent,
        NavbarComponent,
        FooterComponent,
        AddNewBudgetComponent
      ],
      imports: [HttpModule],
      providers: [GoogleApiService, UserDataService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', async(() => {
    expect(fixture.debugElement.componentInstance).toBeTruthy();
  }));

  it('should have header', async(() => {
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('header')).not.toBeNull();
  }));

  it('should have main content', async(() => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('main')).not.toBeNull();
  }));

  it('should have footer', async(() => {
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('footer')).not.toBeNull();
  }));
});
