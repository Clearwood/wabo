import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {RouterModule} from '@angular/router';
import {HomeComponent} from './components/home/home.component';
import {TaskService} from './shared/services/task.service';
import {HeaderComponent} from './shared/header/header.component';
import {LoginComponent} from './components/login/login.component';
import {HttpClientModule} from '@angular/common/http';
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
import { ShoppingItemService } from './shared/services/shoppingItem.service';
import { ShopService } from './shared/services/shop.service';
import { ShopXProductsService } from './shared/services/shopXProducts.service';
import { ShopFeedbackService } from './shared/services/shop-feedback.service';


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
    ProfileComponent,
    OrderDetailComponent
  ],
  imports: [
    // core
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot([
      {path: 'home', component: HomeComponent},
      {path: 'profile', component: ProfileComponent},
      {path: 'order/:id', component: OrderDetailComponent},
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
    MatIconModule
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
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
