import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestaurantsMenu } from './restaurants-menu';

describe('RestaurantsMenu', () => {
  let component: RestaurantsMenu;
  let fixture: ComponentFixture<RestaurantsMenu>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RestaurantsMenu]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RestaurantsMenu);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
