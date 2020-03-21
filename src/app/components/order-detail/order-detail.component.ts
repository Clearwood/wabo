import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-order-detail',
    templateUrl: './order-detail.component.html',
    styleUrls: ['./order-detail.component.scss']
})
export class OrderDetailComponent implements OnInit {

    constructor(private route: ActivatedRoute) { }

    ngOnInit(): void {
        let orderId = this.route.snapshot.paramMap.get('id');
        this.route.params.subscribe(param => {
            if (param.id) {
                orderId = param.id;
            }
        });
    }

}
