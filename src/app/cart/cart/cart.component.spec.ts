import { FormsModule } from '@angular/forms';
import { PizzaService } from './../../pizza.service';
import { HttpModule } from '@angular/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CartComponent } from './cart.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';


describe('CartComponent', () => {
  let component: CartComponent;
  let fixture: ComponentFixture<CartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CartComponent ],
      imports: [HttpModule, FormsModule],
      providers: [PizzaService],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    component.pizza = {quantity: 1, price: 10};
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('changeSubTotal() should change the price when given proper arguments', () => {
    const ev = {
      target: {
        value: 2
      }
    };
    component.changeSubTotal(ev);
    expect(component.pizza.quantity).toEqual(ev.target.value);
  });
});
