import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import {Job, JobStatus} from 'src/app/models/job';
import { Observable} from 'rxjs';

@Injectable()
export class JobService {

  constructor(private http: HttpClient,
  ) {
  }

  private dataApiEndpoint = environment.apiUrl + '/jobs';

  public getJobById(jobId: string): Observable<Job> {
    return this.http.get<Job>(this.dataApiEndpoint + '/' + jobId);
  }

  public createJob(job: Job): Observable<Job> {
    return this.http.post<Job>(this.dataApiEndpoint, job);
  }

  public updateJob(job: Job): Observable<Job> {
    return this.http.put<Job>(this.dataApiEndpoint + '/' + job.id, job);
  }

  public deleteJob(jobId: string): Observable<Job> {
    return this.http.delete<Job>(this.dataApiEndpoint + '/' + jobId);
  }

  public getAllJobs(params?: HttpParams): Observable<Job[]> {
    return this.http.get<Job[]>(this.dataApiEndpoint, {params});
  }

  public getJobStatus(jobId): Observable<JobStatus> {
    return this.http.get<JobStatus>(`${this.dataApiEndpoint}/${jobId}/status`);
  }
}
