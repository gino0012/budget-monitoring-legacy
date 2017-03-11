import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { MaterializeModule } from 'angular2-materialize';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main.component';
import { AddNewBudgetComponent } from './shared/modals/add-new-budget/add-new-budget.component';

import { GoogleApiService } from './shared/services/google/google-api.service';
import { GoogleService } from './shared/services/google/google.service';
import { UserDataService } from './shared/services/user-data.service';
import { AuthenticationResolver } from './shared/resolver/authentication-resolver.service';

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
    component: MainComponent,
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
    AddNewBudgetComponent,
    LoginComponent,
    MainComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterializeModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    AuthenticationResolver,
    GoogleApiService,
    GoogleService,
    UserDataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
