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
import { JobService } from 'src/app/shared/services/job.service';
import { Job } from 'src/app/models/job';

interface ShoppingListProduct extends ShoppingItem {
  product?: Product;
}

@Component({
  selector: 'app-job-accepted',
  templateUrl: './job-accepted.component.html',
  styleUrls: ['./job-accepted.component.scss']
})
export class JobAcceptedComponent implements OnInit {

  private jobId: string;
  private job: Job;

  private shoppingListID: string;
  public shoppingList: ShoppingList;
  public shoppingListProducts: ShoppingListProduct[];

  public consumer: Consumer;

  constructor(
    private jobService: JobService,
    private shoppingListService: ShoppingListService,
    private shoppingItemService: ShoppingItemService,
    private productService: ProductService,
    private consumerService: ConsumerService,
    private route: ActivatedRoute,
    private router: Router,
  ) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(param => {
      this.jobId = param.id;
      this.getJob(this.jobId);
    });
  }

  private getJob(jobId: string) {
    this.jobService.getJobById(jobId).subscribe(job => {
      this.job = job;
      this.shoppingListID = job.shoppingList_id;
      this.getShoppingListProducts(this.shoppingListID);
    });
  }

  // Call this after getting the information for the job; We need the job id for the accept action.
  private getShoppingListProducts(shoppingListId: string) {
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
          return this.productService.getProductById(item.product_id).pipe(map(product => {
            item.product = product;
            return item;
          }));

        });
        return zip(...shoppingOps);
      })
    ).subscribe(shoppingListProducts => {
      this.shoppingListProducts = shoppingListProducts;
    });
  }

  public onDeliveredClick() {
    // Implement check if the purchases were really delivered
    this.router.navigate(['home']);
  }

}
