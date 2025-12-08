import { Component, inject, input, viewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Spinner } from '../../components/spinner/spinner';
import { AuthService } from '../../services/auth-service';
import { CategoriesService } from '../../services/categories-service';
import { Router } from '@angular/router';
import { Category, NewCategory, UpdateCategoryRequestDto } from '../../Interfaces/Categories';

@Component({
  selector: 'app-categorias-edicion',
  imports: [FormsModule, Spinner],
  templateUrl: './categorias-edicion.html',
  styleUrl: './categorias-edicion.scss',
})
export class CategoriasEdicion {
  authService = inject(AuthService)
  categoryService = inject(CategoriesService)
  router = inject(Router)
  idCategory = input<number>();
  categoryOriginal: Category | undefined = undefined;
  form = viewChild<NgForm>("newCategoryForm");
  errorBack = false;
  isLoading = false;

  async ngOnInit() {
    // Obtiene la categoría a editar
    const allCategories = this.categoryService.categories();
    this.categoryOriginal = allCategories.find(cat => cat.id == this.idCategory());

    if (this.categoryOriginal) {
      this.form()?.setValue({
        name: this.categoryOriginal.name,
      });
    } else {
      // Carga todas las categorías, por si no estaban cargadas en el servicio
      await this.categoryService.getCategoriesByRestaurant(this.authService.getUserId());
      const freshCategories = this.categoryService.categories();
      this.categoryOriginal = freshCategories.find(cat => cat.id == this.idCategory()!);

      // Rellena el formulario si se encontró la categoría
      if (this.categoryOriginal) {
        this.form()?.setValue({
          name: this.categoryOriginal.name,
        });
      }
    }
  }


  async handleFormSubmission(form: NgForm) {
    this.errorBack = false;
    const nuevaCategory: NewCategory = {
      name: form.value.name,
      restaurantId: this.authService.getUserId(),
    }
    let res;
    this.isLoading = true;

    if (this.idCategory()) {
      //Edita una categoría existente
      const updateData: UpdateCategoryRequestDto = {
        name: nuevaCategory.name
      }
      res = await this.categoryService.updateCategory(this.idCategory()!, updateData);
    } else {
      // Crea una nueva categoría
      res = await this.categoryService.addCategory(nuevaCategory);
    }

    this.isLoading = false;

    if (!res) {
      this.errorBack = true;
      return
    };

    this.router.navigate(["/"]); // corregir con la ruta correspondiente
  }


}
