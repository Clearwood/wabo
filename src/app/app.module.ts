import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {RouterModule} from '@angular/router';
import {HomeComponent} from './components/home/home.component';
import {TaskService} from './shared/services/task.service';
import {HeaderComponent} from './shared/header/header.component';
import {FooterComponent} from './shared/footer/footer.component';
import { LoginComponent } from './components/login/login.component';

@NgModule({
  declarations: [
    // components
    AppComponent,
    HomeComponent,
    // shared
    HeaderComponent,
    FooterComponent,
    LoginComponent,
  ],
  imports: [
    // core
    BrowserModule,
    RouterModule.forRoot([
      {path: 'home', component: HomeComponent},
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
