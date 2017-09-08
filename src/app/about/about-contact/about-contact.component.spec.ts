import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutContactComponent } from './about-contact.component';

describe('AboutContactComponent', () => {
  let component: AboutContactComponent;
  let fixture: ComponentFixture<AboutContactComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AboutContactComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
