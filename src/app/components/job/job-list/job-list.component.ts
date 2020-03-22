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
    private userService: UserService,
    private router: Router,
  ) {
  }

  ngOnInit(): void {
    this.getJobs();
  }

  private getJobs() {
    const body = {
      'longitude': '52.5041028',
      'latitude': '13.3372608'
    };
    this.jobService.getAllJobs(body).pipe(
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
      this.jobs = [
        {
          shoppingList_id: 'DieAntwortAufDieFrage',
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
      ];
    });
  }

  public onDetailClick(job: Job) {
    this.router.navigate([`jobs/detail/${job.id}`]);
  }

  public onAcceptClick(job: Job) {
    this.userService.getUser().subscribe(user => {
      console.log('Ellenar ist ein noob');
      job.status = JobStatus.IN_PROGRESS;
      job.supplier_id = user.id;
      job.acceptedJobTime = new Date();

      this.jobService.updateJob(job).subscribe(job =>{
        this.router.navigate[`jobs/accepted/${job.id}`];
      });
    });
  }

}
