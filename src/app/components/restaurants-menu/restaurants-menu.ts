import { Component, inject, input, OnInit, signal, viewChild } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from "@angular/router";
import { RestaurantService } from '../../services/restaurant-service';
import { NewProduct, Product } from '../../Interfaces/Products';
import { UsersService } from '../../services/user-service';
import { AuthService } from '../../services/auth-service';
import { CategoriesService } from '../../services/categories-service';
import { User } from '../../Interfaces/User';
import { Category } from '../../Interfaces/Categories';

@Component({
  selector: 'app-restaurants-menu',
  templateUrl: './restaurants-menu.html',
  styleUrl: './restaurants-menu.scss',
})
export class RestaurantsMenu implements OnInit{

  restaurantName = input.required<string>();
  usersService = inject(UsersService);
  router = inject(Router);
  cargandoInfo = false;
  user: User | undefined;
  categoriesService = inject( CategoriesService);
  auth = inject(AuthService);
  restaurantService= inject(RestaurantService);
  selectedCategoryId = signal<number | null>(null);
  idRestaurant = input<number>();
  product :Product| undefined;
  categories: Category[] = [];
  products: Product[] = [];

  volver() {
    this.router.navigate(['/restaurants']);
    }
    async ngOnInit() {
      const restaurantId = this.idRestaurant();
      if (restaurantId) {
        this.cargandoInfo = true;
        this.user = this.usersService.users.find(r => r.id === restaurantId);
        if (!this.user) {
          this.user = await this.usersService.getUsersbyId(restaurantId);
        }
        await this.restaurantService.getProductbyrestaurant(restaurantId);
        this.products = this.restaurantService.Product;

        await this.categoriesService.getCategoriesByRestaurant(restaurantId);
        this.categories = this.categoriesService.categories();

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

  