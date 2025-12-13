import { Component, inject, input, OnInit, signal, computed, numberAttribute } from '@angular/core';
import { Router } from "@angular/router";
import { CommonModule } from '@angular/common'; // Importante para pipes como currency
import { RestaurantService } from '../../services/restaurant-service';
import { UsersService } from '../../services/user-service';
import { CategoriesService } from '../../services/categories-service';
import { Product } from '../../Interfaces/Products';
import { User } from '../../Interfaces/User';
import { Category } from '../../Interfaces/Categories';

@Component({
  selector: 'app-restaurants-menu',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './restaurants-menu.html',
  styleUrl: './restaurants-menu.scss',
})
export class RestaurantsMenu implements OnInit {
  private router = inject(Router);
  private usersService = inject(UsersService);
  private restaurantService = inject(RestaurantService);
  private categoriesService = inject(CategoriesService);

  // Usamos 'transform' para convertir el string de la URL en número automáticamente
  idRestaurant = input.required<number, string>({ transform: numberAttribute });

  isLoading = signal<boolean>(true);
  user = signal<User | undefined>(undefined);
  products = signal<Product[]>([]);
  categories = signal<Category[]>([]);
  selectedCategoryId = signal<number | null>(null);

  // Se actualiza automáticamente si cambia 'products' o 'selectedCategoryId'
  filteredProducts = computed(() => {
    const selectedId = this.selectedCategoryId();
    const currentProducts = this.products();

    if (selectedId === null) {
      return currentProducts;
    }
    return currentProducts.filter(p => p.categoryId === selectedId);
  });

async ngOnInit() {
  // Obtenemos el ID del Input Signal
  const id = this.idRestaurant(); 

  if (id) {
    this.isLoading.set(true); // Activa el spinner

    try {
      // Cargar Datos del Restaurante
      // Primero buscamos si ya lo tenemos en memoria
      let restaurantUser = this.usersService.users.find(r => r.id === id);
      
      // Si no está en memoria, lo pedimos al backend
      if (!restaurantUser) {
        restaurantUser = await this.usersService.getUsersbyId(id);
      }
      this.user.set(restaurantUser);

      // Cargar Productos
      const prods = await this.restaurantService.getProductbyrestaurant(id);
      this.products.set(prods);

      // Cargar Categorías 
      await this.categoriesService.getCategoriesByRestaurant(id);
      this.categories.set(this.categoriesService.categories());

    } catch (error) {
      console.error("Falló la carga del menú:", error);
    } finally {
      // Apagar Spinner
      this.isLoading.set(false);
    }
  }
}

  selectCategory(categoryId: number | null) {
    this.selectedCategoryId.set(categoryId);
  }

  calculateFinalPrice(product: Product): number {
    const discount = product.discount || 0;
    return product.price - (product.price * (discount / 100));
  }

  volver() {
    this.router.navigate(['/restaurants']);
  }
}