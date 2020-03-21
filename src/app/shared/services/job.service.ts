import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Job } from 'src/app/models/job';
import { Observable, of } from 'rxjs';

@Injectable()
export class JobService {

  constructor(private http: HttpClient,
  ) {
  }

  private dataApiEndpoint = environment.apiUrl + '/job';

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
}
