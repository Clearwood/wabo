import {Component, OnInit} from '@angular/core';
import {Job, JobStatus} from '../../../models/job';
import {JobService} from '../../../shared/services/job.service';
import {ActivatedRoute, Router} from '@angular/router';
import {map, switchMap} from 'rxjs/operators';
import {ShoppingItemService} from '../../../shared/services/shopping-item.service';
import {SupplierService} from '../../../shared/services/supplier.service';
import {ConsumerService} from '../../../shared/services/consumer.service';
import {Consumer} from '../../../models/consumer';
import {Supplier} from '../../../models/supplier';
import {UserService} from '../../../shared/services/user.service';
import {ShoppingListService} from '../../../shared/services/shopping-list.service';
import {ShoppingList} from '../../../models/shopping-list';
import {ShoppingItem} from '../../../models/shopping-item';
import {HttpParams} from '@angular/common/http';
import {of, zip} from 'rxjs';
import {ProductService} from '../../../shared/services/product.service';
import {Product} from '../../../models/product';

interface ExtendedShoppingItem extends ShoppingItem {
  product?: Product;
}

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.scss']
})
export class OrderDetailComponent implements OnInit {

  public job: Job;
  public shoppingList: ShoppingList;
  public shoppingItems: ExtendedShoppingItem[];
  public consumer: Consumer;
  public supplier: Supplier;
  private updateFrequencyMinutes = 1;

  constructor(private jobService: JobService,
              private route: ActivatedRoute,
              private router: Router,
              private consumerService: ConsumerService,
              private supplierService: SupplierService,
              private shoppingListService: ShoppingListService,
              private shoppingItemService: ShoppingItemService,
              private userService: UserService,
              private productService: ProductService) {
  }

  ngOnInit(): void {
    const jobId = this.route.snapshot.paramMap.get('id');
    this.jobService.getJobById(jobId).pipe(
      switchMap(job => {
        this.job = job;
        return this.shoppingListService.getShoppingListById(job.shoppingList_id);
      }),
      switchMap(shoppingList => {
        this.shoppingList = shoppingList;
        const params = new HttpParams().set('shoppingList_id', shoppingList.id);
        return this.shoppingItemService.getAllShoppingItem(params);
      }),
      switchMap(shoppingItems => {
        const obs = shoppingItems.map((item: ExtendedShoppingItem) => {
          return this.productService.getProductById(item.product_id).pipe(map(product => {
            item.product = product;
            return item;
          }));
        });
        return zip(...obs);
      }),
      switchMap(shoppingItems => {
        this.shoppingItems = shoppingItems;
        return this.consumerService.getConsumerById(this.job.consumer_id);
      }),
      switchMap((consumer: Consumer) => {
        if (consumer.user.id !== this.userService.currentUserValue.id) {
          this.consumer = consumer;
        }
        if (this.job.supplier_id) {
          return this.supplierService.getSupplierById(this.job.supplier_id);
        } else { return of(null); }
      })
    ).subscribe((supplier: Supplier) => {
      if (supplier && supplier.user.id !== this.userService.currentUserValue.id) {
        this.supplier = supplier;
      }
      setInterval(this.updateJobStatus, this.updateFrequencyMinutes * 60 * 60);
    });
  }

  public updateJobStatus() {
    this.jobService.getJobStatus(this.job.id).subscribe(status => this.job.status = status);
  }

  public onCancelJob() {
    this.job.status = JobStatus.CANCELLED;
    this.jobService.updateJob(this.job).subscribe();
  }

}
