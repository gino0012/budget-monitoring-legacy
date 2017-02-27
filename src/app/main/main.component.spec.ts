/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';

import { UserDataService } from '../shared/services/user-data.service';

import { MainComponent } from './main.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';
import { AddNewBudgetComponent } from '../shared/modals/add-new-budget/add-new-budget.component';


describe('MainComponent', () => {
  let component: MainComponent;
  let fixture: ComponentFixture<MainComponent>;
  let isLoginSpy, navigateSpy;

  beforeEach(async(() => {
    compileModule(true);
  }));

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

  it('should not redirect to login if authenticated', async(() => {
    expect(isLoginSpy).toHaveBeenCalled();
    expect(navigateSpy).not.toHaveBeenCalled();
  }));

  it('should redirect to login if not authenticated', async(() => {
    TestBed.resetTestingModule();
    compileModule(false);

    expect(isLoginSpy).toHaveBeenCalled();
    expect(navigateSpy).toHaveBeenCalledWith(['/login']);
  }));

  function compileModule(isLogin) {
    isLoginSpy = jasmine.createSpy('is login').and.returnValue(isLogin);
    navigateSpy = jasmine.createSpy('navigate');
    const mockRouter = { navigate: navigateSpy };
    const mockUserDataService = { isLogin: isLoginSpy };

    TestBed.configureTestingModule({
      declarations: [
        MainComponent,
        NavbarComponent,
        FooterComponent,
        AddNewBudgetComponent
      ],
      providers: [
        { provide: Router, useValue: mockRouter }
        { provide: UserDataService, useValue: mockUserDataService }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }
});
