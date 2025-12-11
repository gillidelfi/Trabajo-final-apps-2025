import { Component, inject, input, OnInit, signal, computed } from '@angular/core';
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
  private usersService = inject(UsersService); //private porque 
  private restaurantService = inject(RestaurantService);
  private categoriesService = inject(CategoriesService);

  idRestaurant = input.required<number>();
  isLoading = signal<boolean>(true);
  user = signal<User | undefined>(undefined);
  products = signal<Product[]>([]);
  categories = signal<Category[]>([]);
  selectedCategoryId = signal<number | null>(null);


  
filteredProducts = computed(() => {// Se actualiza automáticamente si cambia 'products' o 'selectedCategoryId'
  const selectedId = this.selectedCategoryId();
  const currentProducts = this.products();

  if (selectedId === null) {  
    return currentProducts;
  }

  return currentProducts.filter(p => p.categoryId === selectedId);   // Si hay una categoría seleccionada, devuelve solo los productos de esa categoría
});


async ngOnInit() {
  const restaurantId = this.idRestaurant();
 
  if (restaurantId) { // Solo continúa si hay un ID válido
    this.isLoading.set(true);
   
    try {
      let restaurantUser = this.usersService.users.find(r => r.id === restaurantId); //busca los restaurantes en la lista local

      if (!restaurantUser) { // Si no está en la lista local, lo busca en el backend
        restaurantUser = await this.usersService.getUsersbyId(restaurantId);
      }
      this.user.set(restaurantUser);


      const prods = await this.restaurantService.getProductbyrestaurant(restaurantId);

      if (prods) {
        this.products.set(prods); // Actualiza la señal reactiva 'products' con los datos obtenidos
      }
      await this.categoriesService.getCategoriesByRestaurant(restaurantId);
      this.categories.set(this.categoriesService.categories());

    } catch (error) { // capta todos los errores
      console.error('Error cargando datos del restaurante:', error);
    } finally { //siempre se ejecuta, para desactivar el spinner
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
