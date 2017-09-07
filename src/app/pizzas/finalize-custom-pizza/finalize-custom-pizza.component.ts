import { CustomPizza } from './../make-custom-pizza/custom-pizza.model';
import { Component, OnInit, Inject } from '@angular/core';
import { MdDialogRef, MD_DIALOG_DATA } from '@angular/material';


@Component({
  selector: 'app-finalize-custom-pizza',
  templateUrl: './finalize-custom-pizza.component.html',
  styleUrls: ['./finalize-custom-pizza.component.css']
})
export class FinalizeCustomPizzaComponent implements OnInit {

  constructor(public dialogRef: MdDialogRef<FinalizeCustomPizzaComponent>,
    @Inject(MD_DIALOG_DATA) public data,
    private customPizza: CustomPizza) {

   }

  ngOnInit() {
    console.log(this.customPizza);
    console.log(this.data);
  }

}
