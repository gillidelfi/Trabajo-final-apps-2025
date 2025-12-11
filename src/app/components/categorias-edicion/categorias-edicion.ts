import { Component, inject, input, viewChild, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';


import { Spinner } from '../spinner/spinner';
import { AuthService } from '../../services/auth-service';
import { CategoriesService } from '../../services/categories-service';
import { Category, NewCategory } from '../../Interfaces/Categories';


@Component({
  selector: 'app-categorias-edicion',
  standalone: true,
  imports: [FormsModule, Spinner, CommonModule, RouterLink],
  templateUrl: './categorias-edicion.html',
  styleUrl: './categorias-edicion.scss',
})
export class CategoriasEdicion implements OnInit {
  private authService = inject(AuthService);
  private categoryService = inject(CategoriesService);
  private router = inject(Router);


  // Recibe 'nuevo' o el ID numérico como string desde la URL
  idCategory = input<string>();
 
  form = viewChild<NgForm>("newCategoryForm");
 
  categoryOriginal: Category | undefined = undefined;
  isLoading = false;
  errorBack = false;
  isEditing = false;


  async ngOnInit() {
    this.isLoading = true;
    try {
      const userId = this.authService.getUserId();
      if (!userId) {
        this.router.navigate(['/login']);
        return;
      }
      await this.categoryService.getCategoriesByRestaurant(userId);
      const allCategories = this.categoryService.categories();
      const idParam = this.idCategory(); //Verifica si está editando o creando una nueva

     
      if (idParam && idParam !== 'nuevo') {
        this.isEditing = true;
        this.categoryOriginal = allCategories.find(c => c.id === Number(idParam)); //busca la categoría a editar
        if (this.categoryOriginal) {
          await Promise.resolve();       //asegura que el form este renderizado antes de fijar los valores       
          this.form()?.setValue({
              name: this.categoryOriginal!.name,
            });
        }
      }
    } catch (error) {
      console.error(error);
    } finally {
      this.isLoading = false;
    }
  }

  async handleFormSubmission(form: NgForm) {
    if (form.invalid) return;
    this.isLoading = true;
    this.errorBack = false;
    let res;

    try {
      const userId = this.authService.getUserId();
     
      if (this.isEditing) {
        // ---EDICIÓN ---
        const updateData = { name: form.value.name };
        // Asumiendo que updateCategory devuelve true/false o el objeto
        res = await this.categoryService.updateCategory(Number(this.idCategory()), updateData);
      } else {
        // --- CREACIÓN ---
        const nuevaCategory: NewCategory = {
          name: form.value.name,
          restaurantId: userId,
        };
        res = await this.categoryService.addCategory(nuevaCategory);
      }


      if (res) {
        this.router.navigate(["/configuracion"]);
      } else {
        this.errorBack = true;
      }


    } catch (error) {
      console.error(error);
      this.errorBack = true;
    } finally {
      this.isLoading = false;
    }
  }
}



