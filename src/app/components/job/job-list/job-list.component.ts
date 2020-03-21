import { Component, OnInit } from '@angular/core';
import { Job } from 'src/app/models/job';
import { JobService } from 'src/app/shared/services/job.service';
import { HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-job-list',
  templateUrl: './job-list.component.html',
  styleUrls: ['./job-list.component.scss']
})
export class JobListComponent implements OnInit {

  private jobs: Job[];

  constructor(
    private jobService: JobService,
  ) { }

  ngOnInit(): void {
  }

  private getJobs() {
    const params = new HttpParams().set("longitude", "0.0").set("latidue", "0.0").set("supplierId ", "null");
    this.jobService.getAllJobs(params).subscribe(jobs => {
      this.jobs = jobs;
    })
  }

}
