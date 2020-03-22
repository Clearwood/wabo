import {Component, OnInit} from '@angular/core';
import {HttpParams} from '@angular/common/http';
import {JobService} from '../../../shared/services/job.service';
import {ShoppingListService} from '../../../shared/services/shopping-list.service';
import {ConsumerService} from '../../../shared/services/consumer.service';
import {Job} from '../../../models/job';
import {ShoppingList} from '../../../models/shopping-list';
import {map, switchMap} from 'rxjs/operators';
import {zip} from 'rxjs';
import {UserService} from '../../../shared/services/user.service';
import {SupplierService} from '../../../shared/services/supplier.service';
import {Router} from '@angular/router';

interface ExtendedJob extends Job {
  shoppingList?: ShoppingList;
  isUserSupplier?: boolean;
  isUserConsumer?: boolean;
}

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss']
})
export class OrderListComponent implements OnInit {

  public jobs: ExtendedJob[];
  public consumerId: string;
  private supplierId: string;

  constructor(private jobService: JobService,
              private shoppingListService: ShoppingListService,
              private consumerService: ConsumerService,
              private userService: UserService,
              private supplierService: SupplierService,
              private router: Router) {
  }

  ngOnInit(): void {
    const params = new HttpParams().set('user_id', this.userService.currentUserValue.id);
    this.supplierService.getAllSuppliers(params).pipe(
      switchMap(suppliers => {
        if (suppliers.length) {
          this.supplierId = suppliers[0].id;
        }
        return this.consumerService.getAllConsumers(params);
      }),
      switchMap(consumers => {
        if (consumers.length) {
          this.consumerId = consumers[0].id;
        }
        return this.jobService.getAllJobs(params);
      }),
      switchMap(jobs => {
        const extendedJobs = jobs.map((job: ExtendedJob) => {
          job.isUserSupplier = job.supplier_id && job.supplier_id === this.supplierId;
          job.isUserConsumer = job.consumer_id && job.consumer_id === this.consumerId;
          return this.shoppingListService.getShoppingListById(job.shoppingList_id).pipe(
            map(shoppingList => {
              job.shoppingList = shoppingList;
              return job;
            })
          );
        });
        return zip(...extendedJobs);
      })
    ).subscribe(jobs => {
      this.jobs = jobs;
    });
  }

  onDetailsClick(jobId: string) {
    this.router.navigate(['overview', 'details', jobId]);
  }

}
