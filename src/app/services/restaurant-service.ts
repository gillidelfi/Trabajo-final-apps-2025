
import { inject, Injectable } from '@angular/core';
import { AuthService } from './auth-service';
import { NewProduct, Product } from '../Interfaces/Products';

@Injectable({
  providedIn: 'root'
})

export class RestaurantService {
  aleatorio = Math.random();
  authService = inject(AuthService);

  Product: Product[] = [];
  async addProduct (NewProduct:NewProduct) {
    const res = await fetch("https://w370351.ferozo.com/api/products",
      {
        method: "POST",
        headers: {
          Authorization: "Bearer "+this.authService.token,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(NewProduct)
        });

    if (!res.ok) return;
    const resProduct:Product = await res.json();
    this.Product.push(resProduct);
    return resProduct;

}
async getProductbyrestaurant(id:string | number) {
  const res = await fetch('https://w370351.ferozo.com/api/restaurants/products' + id, {
      headers:{
          Authorization: "Bearer "+this.authService.token,
      },
  });
  if (!res.ok) return;
  const resProduct: RestaurantService = await res.json();
  return resProduct;
  }
  
async getProductById(id: string | number) {
  const res = await fetch('https://w370351.ferozo.com/api/products'+ id,  /**cambiar poniendo id de un producto creado */
    {
      headers:{
        Authorization: "Bearer "+this.authService.token,
      },
    });
  
  if (!res.ok) return;
  const resProduct: Product = await res.json();
  return resProduct;

}
async editProduct(productoEditado: Product) { 
  const res = await fetch ("https://w370351.ferozo.com/api/products"+ productoEditado.id, /**cambiar poniendo id de un producti creado */
  {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + this.authService.token,
    },
    body: JSON.stringify(productoEditado)
    });
  if (!res.ok) return;

    /**edita la lista reemplazando solamente el que editamos  */
  this.Product = this.Product.map(product => {
    if (product.id === productoEditado.id) {
      return productoEditado;
    };
    return product;
  });
  return productoEditado;
}
 /** Borra un contacto */
 async deleteProduct(id:string | number) {
  const res = await fetch('https://w370351.ferozo.com/api/products' + id,/**cambiar poniendo id de un producti creado */
    {
      method: "DELETE",
      headers:{
        Authorization: "Bearer "+this.authService.token,
      },
    });
  if (!res.ok) return false;
  this.Product = this.Product.filter(Product => Product.id !== id);
  return true;
}
async toggleDestacado(id: string | number) { 
  const res = await fetch("https://w370351.ferozo.com/api/products" + id + "/destacado", /**cambiar poniendo id de un producto creado */
    {
      method: "POST",
      headers:{
        Authorization: "Bearer "+this.authService.token,
      },
    });
  if (!res.ok) return;
/**edita la lista reemplazando solamente el que editamos  */
this.Product = this.Product.map(Product =>{
if (Product.id === id) {
  return {...Product, isDestacado: !Product.isDestacado};
};
return Product;
});
return true;
}
async toggleHappyHour(id: string | number, p0: { toggleHappyHour: boolean; }) { 
  const res = await fetch("https://w370351.ferozo.com/api/products" + id + "/hayppyhour", /**cambiar poniendo id de un producto creado */
    {
      method: "PUT",
      headers:{
        Authorization: "Bearer "+this.authService.token,
      },
    });
  if (!res.ok) return;
/**edita la lista reemplazando solamente el que editamos  */
this.Product = this.Product.map(Product =>{
if (Product.id === id) {
  return {...Product, hasHappyHour: !Product.hasHappyHour};
};
return Product;
});
return true;
}
async toggleDiscount(id: string | number, p0: { discount: number; }) { 
  const res = await fetch("https://w370351.ferozo.com/api/products" + id + "/discount", /**cambiar poniendo id de un producto creado */
    {
      method: "PUT",
      headers:{
        Authorization: "Bearer "+this.authService.token,
      },
    });
  if (!res.ok) return;
/**edita la lista reemplazando solamente el que editamos  */
this.Product = this.Product.map(Product =>{
if (Product.id === id) {
  return {...Product, hasDiscount: !Product.discount}; /**cambiar poniendo id de un producto creado */
};
return Product;
});
return true;
}
} 

 
