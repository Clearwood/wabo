import { Component, OnInit, ViewChild } from '@angular/core';
import { Job } from 'src/app/models/job';
import { JobService } from 'src/app/shared/services/job.service';
import { HttpParams } from '@angular/common/http';
import { Consumer } from 'src/app/models/consumer';
import { ShoppingList } from 'src/app/models/shopping-list';
import { switchMap, map } from 'rxjs/operators';
import { ConsumerService } from 'src/app/shared/services/consumer.service';
import { ShoppingListService } from 'src/app/shared/services/shopping-list.service';
import { zip } from 'rxjs';
import { HealthStatus } from 'src/app/models/user';
import { Router } from '@angular/router';

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
        private shoppingListService: ShoppingListService,
        private router: Router,
    ) { }

    ngOnInit(): void {
        this.getJobs();
    }

    private getJobs() {
        /*const params = new HttpParams().set('longitude', '0.0').set('latidue', '0.0').set('supplierId ', 'null');
        this.jobService.getAllJobs(params).pipe(
            switchMap((jobs: ViewJob[]) => {
                const jobsObs = jobs.map(job => {
                    return this.consumerService.getConsumerById(job.consumerId).pipe(map(consumer => {
                        job.consumer = consumer;
                        return job;
                    }));
                });
                return zip(...jobsObs);
            }),
            switchMap((jobs: ViewJob[]) => {
                const jobsObs = jobs.map(job => {
                    return this.shoppingListService.getShoppingListById(job.shoppingListId).pipe(map(shoppingList => {
                        job.shoppingList = shoppingList;
                        return job;
                    }));
                });
                return zip(...jobsObs);
            }),
        ).subscribe(jobs => {
            this.jobs = jobs;
        });*/
        this.jobs = [
          {
            shoppingListId: "DieAntwortAufDieFrage",
            consumer: {
              user: {
                firstName: 'Johnny',
                lastName: 'Joe',
                healthStatus: HealthStatus.QUARANTINE,
              }
            },
            shoppingList: {
              shoppingBagsAmount: 3,
              hasCooledProduct: true,
            }
          },
          {
            consumer: {
              user: {
                firstName: 'Eve',
                lastName: 'A.',
                healthStatus: HealthStatus.HEALTHY,
              }
            },
            shoppingList: {
              shoppingBagsAmount: 10,
              hasCooledProduct: false,
            }
          }
        ]
    }

    public onDetailClick(event, job: Job) {
      console.log('Is it working?');
      console.log(job.shoppingListId);
      this.router.navigate([`jobs/detail/${job.shoppingListId}`]);
    }

    public onAcceptClick() {
      console.log('Ellenar ist ein noob');
    }

}
