import { TestBed, async } from '@angular/core/testing';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { AddNewBudgetComponent } from './shared/modals/add-new-budget/add-new-budget.component';

import { GoogleApiService } from './shared/services/google-api.service';

describe('AppComponent', () => {
  let fixture;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        NavbarComponent,
        FooterComponent,
        AddNewBudgetComponent
      ],
      imports: [HttpModule],
      providers: [GoogleApiService]
    });
    TestBed.compileComponents();
    fixture = TestBed.createComponent(AppComponent);
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
