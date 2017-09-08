import { Router, ActivatedRoute } from '@angular/router';
import { OrdersService } from './../../services/orders/orders.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-orders-list',
  templateUrl: './orders-list.component.html',
  styleUrls: ['./orders-list.component.css']
})
export class OrdersListComponent implements OnInit {

  orders;
  page;
  constructor(public ordersService: OrdersService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {

    this.route
      .queryParams
      .subscribe(params => {
        this.page = +params['page'] || 1;
      });

    this.ordersService.getOrders(this.page)
      .subscribe((orders) => {
        this.orders = orders;
      });
  }

  goToPage(pageNum) {
    this.router.navigate(['/product-list'], { queryParams: { page: pageNum } });
  }

}
