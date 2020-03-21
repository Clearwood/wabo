import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {RouterModule} from '@angular/router';
import {HomeComponent} from './components/home/home.component';
import {TaskService} from './shared/services/task.service';
import {HeaderComponent} from './shared/header/header.component';
import { LoginComponent } from './components/login/login.component';
import {HttpClientModule} from '@angular/common/http';
import { registerLocaleData } from '@angular/common';
import localeDe from '@angular/common/locales/de';
import localeDeExtra from '@angular/common/locales/extra/de';
import {Translate} from './shared/pipes/translate';
import { ProfileComponent } from './components/profile/profile.component';

registerLocaleData(localeDe, 'de-DE', localeDeExtra);

@NgModule({
  declarations: [
    // components
    AppComponent,
    HomeComponent,
    ProfileComponent,
    // shared
    HeaderComponent,
    LoginComponent,
    Translate,
    ProfileComponent
  ],
  imports: [
    // core
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot([
      {path: 'home', component: HomeComponent},
      {path: 'profile', component: ProfileComponent},
      {path: '**', redirectTo: 'home'},
    ]),
    // material design
  ],
  providers: [
    // services
    TaskService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
