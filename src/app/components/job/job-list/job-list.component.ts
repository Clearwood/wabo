import {Component, OnInit} from '@angular/core';
import {Job, JobStatus} from 'src/app/models/job';
import {JobService} from 'src/app/shared/services/job.service';
import {Consumer} from 'src/app/models/consumer';
import {ShoppingList} from 'src/app/models/shopping-list';
import {ConsumerService} from 'src/app/shared/services/consumer.service';
import {ShoppingListService} from 'src/app/shared/services/shopping-list.service';
import {HealthStatus} from 'src/app/models/user';
import {Router} from '@angular/router';
import {HttpParams} from '@angular/common/http';
import {map, switchMap} from 'rxjs/operators';
import {of, zip} from 'rxjs';
import { UserService } from 'src/app/shared/services/user.service';
import { SupplierService } from 'src/app/shared/services/supplier.service';

interface ViewJob extends Job {
  consumer?: Consumer;
  shoppingList?: ShoppingList;
}

@Component({
  selector: 'app-job-list',
  templateUrl: './job-list.component.html',
  styleUrls: ['./job-list.component.scss']
})
export class JobListComponent implements OnInit {

  public jobs: ViewJob[];

  constructor(
    private jobService: JobService,
    private consumerService: ConsumerService,
    private supplierService: SupplierService,
    private shoppingListService: ShoppingListService,
    private userService: UserService,
    private router: Router,
  ) {
  }

  ngOnInit(): void {
    this.getJobs();
  }

  private getJobs() {
    const params = new HttpParams().set('longitude', '13.3372608').set('latitude', '52.5041028');
    this.jobService.getAllJobs(params).pipe(
      switchMap((jobs: ViewJob[]) => {
        const jobsObs = jobs.map(job => {
          return this.consumerService.getConsumerById(job.consumer_id).pipe(map(consumer => {
            job.consumer = consumer;
            return job;
          }));
        });
        return jobsObs.length > 0 ? zip(...jobsObs) : of([]);
      }),
      switchMap((jobs: ViewJob[]) => {
        const jobsObs = jobs.map(job => {
          return this.shoppingListService.getShoppingListById(job.shoppingList_id).pipe(map(shoppingList => {
            job.shoppingList = shoppingList;
            return job;
          }));
        });
        return jobsObs.length > 0 ? zip(...jobsObs) : of([]);
      }),
    ).subscribe(jobs => {
      this.jobs = jobs;
      console.log(this.jobs);
    });
  }

  public onDetailClick(job: Job) {
    this.router.navigate([`jobs/detail/${job.id}`]);
  }

  // TODO: Remove consumer and shopping list from job obejct
  public onAcceptClick(job: Job) {
    const params = new HttpParams().set("user_id", this.userService.currentUserValue.id);
    this.supplierService.getAllSuppliers(params).subscribe(suppliers => {
      if(suppliers[0]) {
        job.status = JobStatus.IN_PROGRESS;
        job.supplier_id = suppliers[0].id;
        job.acceptedJobTime = new Date();
        this.jobService.updateJob(job).subscribe(job =>{
          this.router.navigate([`jobs/accepted/${job.id}`]);
        });
      }
    });
  }

}
