import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { AddNewBudgetComponent } from './shared/modals/add-new-budget/add-new-budget.component';

import { GoogleApiService } from './shared/services/google-api.service';
import { UserDataService } from './shared/services/user-data.service';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    AddNewBudgetComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [GoogleApiService, UserDataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
