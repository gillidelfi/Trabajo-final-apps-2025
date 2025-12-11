import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common'; 
import { AuthService } from '../../services/auth-service';
import { UsersService } from '../../services/user-service';
import { RestaurantService } from '../../services/restaurant-service'; 
import { CategoriesService } from '../../services/categories-service'; 
import { User } from '../../Interfaces/User';
import { Product } from '../../Interfaces/Products';
import { Category } from '../../Interfaces/Categories';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [RouterModule, RouterLink, CommonModule],
  templateUrl: './configuracion.html',
  styleUrl: './configuracion.scss'
})
export class Configuracion implements OnInit {
  // Inyecciones
  private userService = inject(UsersService);
  private authService = inject(AuthService);
  private restaurantService = inject(RestaurantService);
  private categoriesService = inject(CategoriesService);
  public router = inject(Router);


  
  user: User | undefined = undefined;
  products: Product[] = [];     
  categories: Category[] = [];  
 
  cargando = true;
  error = '';
 
  showDeleteConfirm = false;
  isDeleting = false;


  async ngOnInit() {
  await this.loadAllData();
}


async loadAllData() {
  this.cargando = true;
  try {
    const userId = this.authService.getUserId();
    console.log("Cargando datos para usuario ID:", userId);


    if (!userId) {
      this.error = "Sesión expirada";
      return;
    }
   
    this.user = await this.userService.getUsersbyId(userId);

    const prods = await this.restaurantService.getProductbyrestaurant(userId);
   
    this.products = prods || []; 
    
    await this.categoriesService.getCategoriesByRestaurant(userId);
    this.categories = this.categoriesService.categories();


  } catch (err) {
    console.error(err);
    this.error = 'Error cargando datos';
  } finally {
    this.cargando = false;
  }
}

async deleteUser() {
  if (!this.user) return;

  // 1) Mostrar confirmación
  const confirm = await Swal.fire({
    title: '¿Estás seguro?',
    text: 'Esta acción eliminará tu cuenta permanentemente.',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Sí, eliminar',
    cancelButtonText: 'Cancelar'
  });

  // Si el usuario cancela, no sigue
  if (!confirm.isConfirmed) return;

  this.isDeleting = true;

  try {
    const result = await this.userService.deleteUser(this.user.id);

    if (result) {
      await Swal.fire({
        title: 'Cuenta eliminada',
        text: 'Tu cuenta se eliminó correctamente.',
        icon: 'success'
      });

      this.authService.logout();
    } else {
      this.isDeleting = false;
      await Swal.fire({
        title: 'Error',
        text: 'No se pudo eliminar la cuenta.',
        icon: 'error'
      });
    }
  } catch (err) {
    this.isDeleting = false;
    await Swal.fire({
      title: 'Error',
      text: 'Ocurrió un error al eliminar la cuenta.',
      icon: 'error'
    });
  }
}
  

async deleteProduct(id: number) {

  const confirm = await Swal.fire({
    title: '¿Borrar producto?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Sí',
    cancelButtonText: 'Cancelar'
  });

  if (!confirm.isConfirmed) return;

  const success = await this.restaurantService.deleteProduct(id);

  if (success) {
    this.products = this.products.filter(p => p.id !== id);
    Swal.fire('Eliminado', 'El producto fue eliminado', 'success');
  } else {
    Swal.fire('Error', 'No se pudo eliminar el producto', 'error');
  }
}
  

  async deleteCategory(id: number) {

    const confirm = await Swal.fire({
      title: '¿Borrar categoría?',
      text: 'Esto podría afectar productos asociados.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí',
      cancelButtonText: 'Cancelar'
    });
  
    if (!confirm.isConfirmed) return;
  
    const success = await this.categoriesService.deleteCategory(id);
  
    if (success) {
      this.categories = this.categories.filter(c => c.id !== id);
      Swal.fire('Eliminada', 'La categoría fue eliminada', 'success');
    } else {
      Swal.fire('Error', 'No se pudo eliminar la categoría', 'error');
    }
  }
}

