import { MyCurrencyPipe } from './../../pipes/mycurrency.pipe';
import { MdDialogModule } from '@angular/material';
import { HttpModule } from '@angular/http';
import { PizzaService } from './../../pizza.service';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CartListComponent } from './cart-list.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

fdescribe('CartListComponent', () => {
  let component: CartListComponent;
  let fixture: ComponentFixture<CartListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule, MdDialogModule],
      declarations: [ CartListComponent, MyCurrencyPipe ],
      providers: [PizzaService],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CartListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    component.pizzas = [{price: 5, quantity: 1, id: 1}, {price: 3, quantity: 2, id: 2}];
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('getPrice() should return the proper price', () => {
    const actual = component.getPrice();
    const expected = 11;
    expect(actual).toEqual(expected);
  });

  it('updateTotalPrice() should update the price correctly', () => {
    component.updateTotalPrice(14);
    const actual = +component.totalPrice;
    const expected = 14;
    expect(actual).toEqual(expected);
  });

  it('updateCartList() should remove pizzas from the cart', () => {
    const initialLength = component.pizzas.length;
    component.updateCartList(1);
    const actual = component.pizzas.length;
    const expected = initialLength - 1;
    expect(actual).toEqual(expected);
  });
});
