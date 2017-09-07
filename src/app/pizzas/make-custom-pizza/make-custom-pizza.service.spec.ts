/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { MakeCustomPizzaService } from './make-custom-pizza.service';

describe('Service: MakeCustomPizza', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MakeCustomPizzaService]
    });
  });

  it('should ...', inject([MakeCustomPizzaService], (service: MakeCustomPizzaService) => {
    expect(service).toBeTruthy();
  }));
});