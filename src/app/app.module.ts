import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {RouterModule} from '@angular/router';
import {HomeComponent} from './components/home/home.component';
import {TaskService} from './shared/services/task.service';
import {HeaderComponent} from './shared/header/header.component';
import {LoginComponent} from './components/login/login.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {Translate} from './shared/pipes/translate';
import {ProfileComponent} from './components/profile/profile.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material/button';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatIconModule} from '@angular/material/icon';
import { UserService } from './shared/services/user.service';
import { OrderDetailComponent } from './components/order-detail/order-detail.component';
import { ProductService } from './shared/services/product.service';
import { ShoppingItemService } from './shared/services/shopping-item.service';
import { ShopService } from './shared/services/shop.service';
import { ShopXProductsService } from './shared/services/shop-x-products.service';
import { ShopFeedbackService } from './shared/services/shop-feedback.service';
import { JobListComponent } from './components/job/job-list/job-list.component';
import { JobDetailComponent } from './components/job/job-detail/job-detail.component';
import {JwtInterceptor} from './core/interceptors/jwt.interceptor';
import {AuthService} from './core/authentication/auth.service';
import {AuthGuard} from './core/authentication/auth.guard';
import {MatCardModule} from '@angular/material/card';

@NgModule({
  declarations: [
    // components
    AppComponent,
    HomeComponent,
    ProfileComponent,
    ProfileComponent,
    HeaderComponent,
    // shared
    LoginComponent,
    Translate,
    JobListComponent,
    JobDetailComponent,
  ],
  imports: [
    // core
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot([
      {path: 'login', component: LoginComponent},
      {path: 'home', component: HomeComponent, canActivate: [AuthGuard]},
      {path: 'profile', component: ProfileComponent, canActivate: [AuthGuard]},
      {path: 'jobs', component: JobListComponent, canActivate: [AuthGuard]},
      {path: 'jobs/detail/:id', component: JobDetailComponent, canActivate: [AuthGuard]},
      {path: '**', redirectTo: 'home'},
    ]),
    FormsModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    // material
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatSnackBarModule,
    MatIconModule,
    MatCardModule
  ],
  providers: [
    // services
    TaskService,
    UserService,
    ProductService,
    ShoppingItemService,
    ShopService,
    ShopXProductsService,
    ShopFeedbackService,
    AuthService,
    AuthGuard,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
