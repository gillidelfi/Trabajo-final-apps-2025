import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestaurantsListItems } from './restaurants-list-items';

describe('RestaurantsListItems', () => {
  let component: RestaurantsListItems;
  let fixture: ComponentFixture<RestaurantsListItems>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RestaurantsListItems]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RestaurantsListItems);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
