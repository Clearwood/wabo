import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ShoppingItemService } from 'src/app/shared/services/shopping-item.service';
import { Product } from 'src/app/models/product';
import { ShoppingItem } from 'src/app/models/shopping-item';
import { ProductService } from 'src/app/shared/services/product.service';
import { Consumer } from 'src/app/models/consumer';
import { ShoppingList } from 'src/app/models/shopping-list';
import { ShoppingListService } from 'src/app/shared/services/shopping-list.service';
import { ConsumerService } from 'src/app/shared/services/consumer.service';
import { HttpParams } from '@angular/common/http';
import { map, switchMap } from 'rxjs/operators';
import { zip } from 'rxjs';
import { Job } from 'src/app/models/job';
import { JobService } from 'src/app/shared/services/job.service';

interface ShoppingListProduct extends ShoppingItem {
  product?: Product;
}


@Component({
  selector: 'app-job-detail',
  templateUrl: './job-detail.component.html',
  styleUrls: ['./job-detail.component.scss']
})
export class JobDetailComponent implements OnInit {

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
    this.jobService.getJobById(jobId).pipe(
      switchMap((job: Job) => {
        this.job = job;
        this.shoppingListID = job.shoppingList_id;
        return this.shoppingListService.getShoppingListById(this.shoppingListID);
      }),
      switchMap(shoppingList => {
        this.shoppingList = shoppingList;
        return this.consumerService.getConsumerById(shoppingList.consumer_id);
      }),
      switchMap(consumer => {
        this.consumer = consumer;
        const params = new HttpParams().set('shoppingListId', this.shoppingListID);
        return this.shoppingItemService.getAllShoppingItem(params);
      }),
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

  public onBackClick() {
    this.router.navigate(['jobs']);
  }

  public onAcceptClick() {

  }

}
