import {Component, OnInit} from '@angular/core';
import {Job, JobStatus} from '../../../models/job';
import {JobService} from '../../../shared/services/job.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.scss']
})
export class OrderDetailComponent implements OnInit {

  public job: Job;
  private updateFrequencyMinutes = 1;

  constructor(private jobService: JobService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
    const jobId = this.route.snapshot.paramMap.get('id');
    this.jobService.getJobById(jobId).subscribe(job => {
      this.job = job;
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
