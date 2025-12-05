import { Component, inject, input, OnInit, signal, viewChild } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from "@angular/router";
import { RestaurantService } from '../../services/restaurant-service';
import { NewProduct, Product } from '../../Interfaces/Products';
import { UsersService } from '../../services/user-service';
import { AuthService } from '../../services/auth-service';
import { CategoriesService } from '../../services/categories-service';
import { User } from '../../Interfaces/User';

@Component({
  selector: 'app-restaurants-menu',
  templateUrl: './restaurants-menu.html',
  styleUrl: './restaurants-menu.scss',
})
export class RestaurantsMenu implements OnInit{
  restaurantName = input.required<string>();
  usersService = inject(UsersService)
  router = inject(Router)
  cargandoInfo = false;
  user: User | undefined;
  categoriesService = inject( CategoriesService)
  auth = inject(AuthService);
  categories= this.categoriesService.categories
  restaurantService= inject(RestaurantService)
  products= this.restaurantService.Product;
   selectedCategoryId = signal<number | null>(null);
   idRestaurant = input<number>();
   product :Product| undefined;

  
  async ngOnInit(): Promise<void> {
    if (this.restaurantName()) {
      this.cargandoInfo = true;
      this.user = this.usersService.users.find(restaurant => restaurant.restaurantName === this.restaurantName());
      if (!this.user){
        await this.usersService.getusers();
        this.user = this.usersService.users.find(restaurant => restaurant.restaurantName === this.restaurantName())!;
      }
      await this.restaurantService.getProductbyrestaurant(this.user.id);      
      await this.categoriesService.getCategoriesByRestaurant(this.user.id);
      this.cargandoInfo = false;
    }
  }
  selectCategory(categoryId: number | null) {
    this.selectedCategoryId.set(categoryId);
  }
  getFilteredProducts(): Product[] {
    const selectedId = this.selectedCategoryId();
    if (selectedId === null) {
      return this.products;
    }
    return this.products.filter(p => p.categoryId === selectedId);
  }
  calculateFinalPrice(product: Product): number {
    const discount = product.discount || 0;
      return product.price - (product.price * (discount / 100));
    }
  }

  