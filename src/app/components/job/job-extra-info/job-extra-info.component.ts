import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-job-extra-info',
  templateUrl: './job-extra-info.component.html',
  styleUrls: ['./job-extra-info.component.scss']
})
export class JobExtraInfoComponent implements OnInit {

  public distanceInKm: number = 1;
  public shoppingBagsAmount: number = 3;
  public hasFrostedProducts: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  formatLabel(value: number | null) {
    return value ? value + ' km': 0 + ' km';
  }

  public onSearchClick() {

  }

}
