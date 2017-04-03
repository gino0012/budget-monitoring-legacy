import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { MaterialModule } from '@angular/material';
import 'hammerjs';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { AddNewBudgetComponent } from './shared/modals/add-new-budget/add-new-budget.component';

import { GoogleApiService } from './shared/services/google/google-api.service';
import { GoogleService } from './shared/services/google/google.service';
import { UserDataService } from './shared/services/user-data.service';
import { AuthenticationResolver } from './shared/resolver/authentication-resolver.service';
import { BudgetService } from './shared/services/budget.service';
import { Constants } from './shared/constants/constants';
import { LoaderBlueComponent } from './shared/loaders/loader-blue/loader-blue.component';
import { MainComponent } from './main/main.component';
import { AddNewAccountComponent } from './shared/modals/add-new-account/add-new-account.component';

const appRoutes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    resolve: {
      isAuthenticated: AuthenticationResolver
    }
  },
  {
    path: 'home',
    component: HomeComponent,
    resolve: {
      isAuthenticated: AuthenticationResolver
    }
  },
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  }
];

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    LoginComponent,
    HomeComponent,
    AddNewBudgetComponent,
    LoaderBlueComponent,
    MainComponent,
    AddNewAccountComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterialModule.forRoot(),
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    AuthenticationResolver,
    BudgetService,
    Constants,
    GoogleApiService,
    GoogleService,
    UserDataService
  ],
  entryComponents: [
    AddNewBudgetComponent,
    AddNewAccountComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
