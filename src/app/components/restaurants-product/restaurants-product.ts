import { Component, inject, input, OnInit, viewChild } from '@angular/core';
import { NewProduct, Product } from '../../Interfaces/Products';
import { Router } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { Spinner } from '../spinner/spinner';
import { RestaurantService } from '../../services/restaurant-service';

@Component({
  selector: 'app-restaurants-product',
  imports: [Spinner, FormsModule],
  templateUrl: './restaurants-product.html',
  styleUrl: './restaurants-product.scss',
})
export class RestaurantsProduct implements OnInit{
  RestaurantService = inject(RestaurantService);
  idProduct = input<number>();
  productoOriginal: Product | undefined = undefined;
  errorEnBack = false;
  router= inject(Router);
  form = viewChild<NgForm>('newContactForm');
  isLoading = false;
  
  async ngOnInit() {
    if(this.idProduct()){
      this.productoOriginal = await this.RestaurantService.getProductById(this.idProduct()!); //crear get product by id en el restaurant-service
      // Cambio los valores del formulario
      this.form()?.setValue({
        firstName: this.productoOriginal!.name,
        lastName: this.productoOriginal!.description,
        address: this.productoOriginal!.price,
        email: this.productoOriginal!.categoryId,
        image: this.productoOriginal!.featured,
        number: this.productoOriginal!.labels,
        recommendedFor: this.productoOriginal!.recommendedFor,
        company: this.productoOriginal!.discount,
        hasHappyHour: this.productoOriginal!.hasHappyHour,
        id: this.productoOriginal!.id, 
        isDestacado: this.productoOriginal!.isDestacado
      })
    }
  }

   /** Revisa si estamos editando o creando un contacto y ejecuta la función correspondiente del servicio de contactos */
   async handleFormSubmission(form:NgForm){

    this.errorEnBack = false;
    const nuevoProducto: NewProduct ={
      name: form.value.name,
      description: form.value.description,
      price: form.value.price,
      categoryId: form.value.categoryId,
      featured: form.value.featured,
      labels: form.value.labels, 
      recommendedFor: form.value.recommendedFor,
      discount: form.value.discount,
      hasHappyHour: form.value.hasHappyHour,
      isDestacado: form.value.isDestacado,
    }
    console.log(nuevoProducto);
    let res;
    this.isLoading = true;
    if(this.idProduct()){
      res = await this.RestaurantService.editProduct({...nuevoProducto, id: this.idProduct()!})
    } else {
      res = await this.RestaurantService.addProduct(nuevoProducto);
    }
    console.log(res);
    this.isLoading = false;
    if(!res) {
      this.errorEnBack = true;
      return
    };
    this.router.navigate(["/products", res.id]);     // crear ruta a la pagina del producto creado o editado

  }

}


