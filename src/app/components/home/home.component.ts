import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {ConsumerService} from '../../shared/services/consumer.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  onViewOverview() {
    this.router.navigate(['overview/list']);
  }

  onOrderClick() {
    this.router.navigate(['shopping-list']);
  }

  onSupplyClick() {
    this.router.navigate(['jobs']);
  }




}
