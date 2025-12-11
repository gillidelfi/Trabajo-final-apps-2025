import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriasEdicion } from './categorias-edicion';

describe('CategoriasEdicion', () => {
  let component: CategoriasEdicion;
  let fixture: ComponentFixture<CategoriasEdicion>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategoriasEdicion]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategoriasEdicion);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
