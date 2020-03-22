import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {RouterModule} from '@angular/router';
import {HomeComponent} from './components/home/home.component';
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
import { ShoppingListComponent } from './components/shopping/shopping-list/shopping-list.component';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatSelectModule} from '@angular/material/select';
import {ShoppingListService} from './shared/services/shopping-list.service';
import {MatChipsModule} from '@angular/material/chips';
import { ShoppingListDialogComponent } from './components/shopping/shopping-list-dialog/shopping-list-dialog.component';
import {MatDialogModule} from '@angular/material/dialog';
import { CommentDialogComponent } from './shared/comment-dialog/comment-dialog.component';
import {MatSliderModule} from '@angular/material/slider';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProfileComponent,
    ProfileComponent,
    HeaderComponent,
    LoginComponent,
    Translate,
    JobListComponent,
    JobDetailComponent,
    ShoppingListComponent,
    ShoppingListDialogComponent,
    CommentDialogComponent,
  ],
  imports: [
    // core
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot([
      {path: 'home', component: HomeComponent, canActivate: [AuthGuard]},
      {path: 'profile', component: ProfileComponent, canActivate: [AuthGuard]},
      {path: 'jobs', component: JobListComponent, canActivate: [AuthGuard]},
      {path: 'jobs/detail/:id', component: JobDetailComponent, canActivate: [AuthGuard]},
      {path: 'shopping-list', component: ShoppingListComponent, canActivate: [AuthGuard]},
      {path: 'login', component: LoginComponent},
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
    MatCardModule,
    MatAutocompleteModule,
    MatSelectModule,
    MatChipsModule,
    MatDialogModule,
    MatSliderModule,
    MatSlideToggleModule
  ],
  providers: [
    UserService,
    ProductService,
    ShoppingItemService,
    ShoppingListService,
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
