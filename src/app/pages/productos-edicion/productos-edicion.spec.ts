import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductosEdicion } from './productos-edicion';

describe('ProductosEdicion', () => {
  let component: ProductosEdicion;
  let fixture: ComponentFixture<ProductosEdicion>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductosEdicion]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductosEdicion);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
