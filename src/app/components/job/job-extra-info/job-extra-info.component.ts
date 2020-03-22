import { Component, OnInit } from '@angular/core';
import { JobService, SearchParams } from 'src/app/shared/services/job.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-job-extra-info',
  templateUrl: './job-extra-info.component.html',
  styleUrls: ['./job-extra-info.component.scss']
})
export class JobExtraInfoComponent implements OnInit {

  public distanceInKm: number = 4;
  public shoppingBagsAmount: number = 3;
  public hasFrostedProducts: boolean = false;

  constructor(
    private jobService: JobService,
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  formatLabel(value: number | null) {
    return value ? value + ' km': 0 + ' km';
  }

  public onSearchClick() {
    const searchParams: SearchParams = {
      maxDistance: this.distanceInKm,
      maxWeight: this.shoppingBagsAmount,
      canContainFrozen: this.hasFrostedProducts,
    }

    this.jobService.setSearchParams(searchParams);

    this.router.navigate(['jobs/list']);
  }

}
