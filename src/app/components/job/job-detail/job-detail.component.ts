import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import { ShoppingItemService } from 'src/app/shared/services/shopping-item.service';
import { Product } from 'src/app/models/product';
import { ShoppingItem } from 'src/app/models/shopping-item';
import { ProductService } from 'src/app/shared/services/product.service';
import { Consumer } from 'src/app/models/consumer';
import { ShoppingList } from 'src/app/models/shopping-list';
import { ShoppingListService } from 'src/app/shared/services/shopping-list.service';
import { ConsumerService } from 'src/app/shared/services/consumer.service';

interface ShoppingListProduct extends ShoppingItem {
  product?: Product;
}


@Component({
  selector: 'app-job-detail',
  templateUrl: './job-detail.component.html',
  styleUrls: ['./job-detail.component.scss']
})
export class JobDetailComponent implements OnInit {

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
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(param => {
      this.shoppingListID = param.id;
      this.getShoppingListProducts(this.shoppingListID);
    });
  }

  private getShoppingListProducts(shoppingListId: string) {
    // TODO implement as pipe instead of two subscribes?
    /*this.shoppingListService.getShoppingListById(shoppingListId).subscribe(shoppingList => {
      this.shoppingList = shoppingList;
      this.consumerService.getConsumerById(shoppingList.consumer_id).subscribe(consumer => {
        this.consumer = consumer;
      });
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
    });*/

    this.shoppingListProducts = [
      {
        product: {
          name: 'Test'
        }
      },
      {
        product: {
          name: 'Test'
        }
      },
      {
        product: {
          name: 'Test'
        }
      },
      {
        product: {
          name: 'Test'
        }
      },
      {
        product: {
          name: 'Test'
        }
      },
      {
        product: {
          name: 'Test'
        }
      },
      {
        product: {
          name: 'Test'
        }
      },
      {
        product: {
          name: 'Test'
        }
      },
      {
        product: {
          name: 'Test'
        }
      },
      {
        product: {
          name: 'Test'
        }
      },
      {
        product: {
          name: 'Test'
        }
      },
      {
        product: {
          name: 'Test'
        }
      },
    ];
  }

  public onAcceptClick() {
    console.log('Click on accept button.');
  }

}
