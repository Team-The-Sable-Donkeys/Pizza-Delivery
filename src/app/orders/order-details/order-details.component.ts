import { MdDialogRef, MD_DIALOG_DATA } from '@angular/material';
import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit {

  constructor(public dialogRef: MdDialogRef<OrderDetailsComponent>,
    @Inject(MD_DIALOG_DATA) public data) { }

  ngOnInit() {
    const left = window.outerWidth * 0.2;
    const top = window.outerHeight * 0.05;
    this.dialogRef.updatePosition({ top: top + 'px', left: left + 'px' });
  }

}
