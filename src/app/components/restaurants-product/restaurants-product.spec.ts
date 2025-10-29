import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestaurantsProduct } from './restaurants-product';

describe('RestaurantsProduct', () => {
  let component: RestaurantsProduct;
  let fixture: ComponentFixture<RestaurantsProduct>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RestaurantsProduct]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RestaurantsProduct);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
