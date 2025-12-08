import { Component, inject, input, viewChild } from '@angular/core';
import { UsersService } from '../../services/user-service';
import { RestaurantService } from '../../services/restaurant-service';
import { AuthService } from '../../services/auth-service';
import { CategoriesService } from '../../services/categories-service';
import { Router } from '@angular/router';
import { NewProduct, Product } from '../../Interfaces/Products';
import { Category } from '../../Interfaces/Categories';
import { FormsModule, NgForm } from '@angular/forms';
import { Spinner } from '../../components/spinner/spinner';

@Component({
  selector: 'app-productos-edicion',
  imports: [FormsModule, Spinner],
  templateUrl: './productos-edicion.html',
  styleUrl: './productos-edicion.scss',
})
export class ProductosEdicion {
  restaurantService = inject(UsersService)
  productService = inject(RestaurantService)
  authService = inject(AuthService)
  categoriesService = inject(CategoriesService)
  idProduct = input<number>();
  router = inject(Router)
  productoOriginal: Product | undefined = undefined;
  categories: Category[] = [];
  form = viewChild<NgForm>(`newProductForm`);
  errorBack = false;
  isLoading = false;


  async ngOnInit() {
    if (this.idProduct()) {
      this.productoOriginal = await this.productService.getProductById(this.idProduct()!);
      this.form()?.setValue({
        Name: this.productoOriginal!.name,
        Descripcion: this.productoOriginal!.description,
        Price: this.productoOriginal!.price,
        Destacado: this.productoOriginal!.featured,
        Recomendado: this.productoOriginal!.recommendedFor,
        Descuento: this.productoOriginal!.discount,
        HappyHour: this.productoOriginal!.hasHappyHour,
      })
    }
    await this.categoriesService.getCategoriesByRestaurant(this.authService.getUserId());
  }
  async handleFormSubmission(form: NgForm) {

    this.errorBack = false;
    const nuevoProducto: NewProduct = {
      name: form.value.name,
      description: form.value.description,
      price: parseInt(form.value.price),
      featured: form.value.featured === true,
      recommendedFor: parseInt(form.value.recommendedFor),
      discount: parseInt(form.value.discount),
      hasHappyHour: form.value.hasHappyHour === true,
      categoryId: parseInt(form.value.categoryId),
      restaurantId: this.authService.getUserId(),
      labels: [],
      isDestacado: false
    };
    let res;
    this.isLoading = true;
    if (this.idProduct()) {
      if (this.productoOriginal && parseInt(form.value.discount) !== this.productoOriginal.discount) {
         await this.productService.toggleDiscount(this.idProduct()!, { discount: parseInt(form.value.discount) });
      }
      if (this.productoOriginal && (form.value.hasHappyHour === true) !== this.productoOriginal.hasHappyHour) {
         await this.productService.toggleHappyHour(this.idProduct()!, { toggleHappyHour: form.value.hasHappyHour === true });
      }
      res = await this.productService.editProduct({
        ...nuevoProducto,
        id: this.idProduct()!
      });
    } else {
      res = await this.productService.addProduct(nuevoProducto);
    }

    this.isLoading = false;

    if (!res) {
      this.errorBack = true;
      return
    };

    this.router.navigate(["/"]);
  }
}


