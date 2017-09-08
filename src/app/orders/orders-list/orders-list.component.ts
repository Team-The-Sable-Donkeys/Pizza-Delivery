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
  pageError;
  maxPage;
  nextDisabled = false;
  prevDisabled = false;
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
      .subscribe((data) => {
        this.orders = data.orders;
        this.maxPage = data.length;
        this.btnCheck(this.maxPage);
      });
  }

  nextPage() {
    let maxPage;
    const newPage = this.page + 1;
    this.ordersService.getOrders(newPage)
      .subscribe((data) => {
        maxPage = data.length;
        if (newPage <= maxPage) {
          this.router.navigate(['/orders'], { queryParams: { page: newPage } });
          this.page = newPage;
          this.btnCheck(this.maxPage);
          this.orders = data.orders;
        }
      });
  }

  prevPage() {
    const newPage = this.page - 1;
    if (newPage <= 0) {
      return;
    }
    this.ordersService.getOrders(newPage)
      .subscribe((data) => {
        this.router.navigate(['/orders'], { queryParams: { page: newPage } });
        this.page = newPage;
        this.btnCheck(this.maxPage);
        this.orders = data.orders;
      });
  }

  btnCheck(maxPage) {
    if (this.page === maxPage) {
      this.nextDisabled = true;
      this.prevDisabled = false;
    }
    if (this.page === 1) {
      this.prevDisabled = true;
      this.nextDisabled = false;
    }
    if (this.page === 1 && this.page === maxPage) {
      this.prevDisabled = true;
      this.nextDisabled = true;
    }
  }

}
