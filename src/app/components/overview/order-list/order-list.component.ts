import {Component, OnInit} from '@angular/core';
import {HttpParams} from '@angular/common/http';
import {JobService} from '../../../shared/services/job.service';
import {ShoppingListService} from '../../../shared/services/shopping-list.service';
import {ConsumerService} from '../../../shared/services/consumer.service';
import {Job} from '../../../models/job';
import {ShoppingList} from '../../../models/shopping-list';
import {filter, map, switchMap} from 'rxjs/operators';
import {of, zip} from 'rxjs';
import {UserService} from '../../../shared/services/user.service';
import {SupplierService} from '../../../shared/services/supplier.service';
import {Router} from '@angular/router';
import {User} from '../../../models/user';

interface ExtendedJob extends Job {
  shoppingList?: ShoppingList;
  customer?: User;
}

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss']
})
export class OrderListComponent implements OnInit {

  public jobs: ExtendedJob[];
  public jobsSupply: ExtendedJob[];
  public jobsConsume: ExtendedJob[];
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
    const jobObs = [];
    const supplyJobs = this.supplierService.currentSupplierSubject.pipe(
      filter(supplier => !!supplier),
      switchMap(supplier => {
        const params = new HttpParams().set('supplier_id', supplier.id);
        return this.jobService.getAllJobs(params);
      }),
      switchMap((jobs: Job[]) => {
        const obs = jobs.map((job: ExtendedJob) => {
          if (job.consumer_id) {
            this.consumerService.getConsumerById(job.consumer_id).pipe(map(consumer => {
              job.customer = consumer;
              return job;
            }));
          } else {
            return of(job);
          }
        });
        return zip(...obs);
      })).subscribe((jobs) => {
      this.jobsSupply = jobs;
    });
    const orderedJob = this.consumerService.currentConsumerSubject.pipe(
      filter(consumer => !!consumer),
      switchMap(consumer => {
        const params = new HttpParams().set('supplier_id', consumer.id);
        return this.jobService.getAllJobs(params);
      }),
      switchMap((jobs: Job[]) => {
        const obs = jobs.map((job: ExtendedJob) => {
          if (job.supplier_id) {
            this.supplierService.getSupplierById(job.supplier_id).pipe(map(supplier => {
              job.customer = supplier;
              return job;
            }));
          } else {
            return of(job);
          }
        });
        return zip(...obs);
      })
    ).subscribe(jobs => {
      this.jobsConsume = jobs;
    });
  }

  onDetailsClick(jobId: string) {
    this.router.navigate(['overview', 'detail', jobId]);
  }

}
