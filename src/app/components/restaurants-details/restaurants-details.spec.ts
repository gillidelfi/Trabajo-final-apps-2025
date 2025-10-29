import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestaurantsDetails } from './restaurants-details';

describe('RestaurantsDetails', () => {
  let component: RestaurantsDetails;
  let fixture: ComponentFixture<RestaurantsDetails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RestaurantsDetails]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RestaurantsDetails);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
