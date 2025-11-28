import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestaurantsCategories } from './restaurants-categories';

describe('RestaurantsCategories', () => {
  let component: RestaurantsCategories;
  let fixture: ComponentFixture<RestaurantsCategories>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RestaurantsCategories]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RestaurantsCategories);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
