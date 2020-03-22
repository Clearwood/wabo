import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';
import { ShoppingItem } from 'src/app/models/shopping-item';
import { ShoppingList } from 'src/app/models/shopping-list';
import { Consumer } from 'src/app/models/consumer';
import { ShoppingListService } from 'src/app/shared/services/shopping-list.service';
import { ShoppingItemService } from 'src/app/shared/services/shopping-item.service';
import { ProductService } from 'src/app/shared/services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ConsumerService } from 'src/app/shared/services/consumer.service';
import {HttpParams} from '@angular/common/http';
import {map, switchMap} from 'rxjs/operators';
import {zip} from 'rxjs';

interface ShoppingListProduct extends ShoppingItem {
  product?: Product;
}

@Component({
  selector: 'app-job-accepted',
  templateUrl: './job-accepted.component.html',
  styleUrls: ['./job-accepted.component.scss']
})
export class JobAcceptedComponent implements OnInit {

  private shoppingListID: string;
  public shoppingList: ShoppingList;
  public shoppingListProducts: ShoppingListProduct[];

  public consumer: Consumer;

  constructor(
    private shoppingListService: ShoppingListService,
    private shoppingItemService: ShoppingItemService,
    private productService: ProductService,
    private consumerService: ConsumerService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(param => {
      this.shoppingListID = param.id;
      this.getShoppingListProducts(this.shoppingListID);
    });
  }

  private getShoppingListProducts(shoppingListId: string) {
    // TODO implement as pipe instead of two subscribes?
    this.shoppingListService.getShoppingListById(shoppingListId).pipe(
      switchMap(shoppingList => {
        this.shoppingList = shoppingList;
        return this.consumerService.getConsumerById(shoppingList.consumer_id);
      })).subscribe(consumer => {
      this.consumer = consumer;
    });

    const params = new HttpParams().set('shoppingListId', shoppingListId);
    this.shoppingItemService.getAllShoppingItem(params).pipe(
      switchMap((items: ShoppingListProduct[]) => {
        const shoppingOps = items.map(item => {
          return this.productService.getProductById(item.productId).pipe(map(product => {
            item.product = product;
            return product;
          }));

        });
        return zip(...shoppingOps);
      })
    ).subscribe(shoppingListProducts => {
      this.shoppingListProducts = shoppingListProducts;
    });
  }

}
