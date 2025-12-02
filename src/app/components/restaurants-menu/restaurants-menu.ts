import { Component, inject, input, OnInit, signal, viewChild } from '@angular/core';
import { Router, RouterOutlet } from "@angular/router";
import { RestaurantService } from '../../services/restaurant-service';
import { NgForm } from '@angular/forms';
import { NewProduct, Product } from '../../Interfaces/Products';

@Component({
  selector: 'app-restaurants-menu',
  imports: [RouterOutlet],
  templateUrl: './restaurants-menu.html',
  styleUrl: './restaurants-menu.scss',
})
export class RestaurantsMenu implements OnInit{
    // Recibe el ID del restaurante desde la URL
    idProduct = input.required<number>(); // O string, según como venga de la URL
  
    // Inyección del servicio (Usa minúscula inicial por convención)
    private restaurantService = inject(RestaurantService);
   
    products = <Product[]>([]);
    isLoading = signal<boolean>(true);
  
  
    ngOnInit() {
      this.loadMenu();
    }
  
    async loadMenu() {
      try {
        const data = await this.restaurantService.getProductbyrestaurant(this.idProduct());
        
        // Guardamos la lista en la señal
        this.products.set(data);
        
      } catch (error) {
        console.error('Error cargando el menú:', error);
      } finally {
        this.isLoading.set(false);
      }
    }
  
    // Función para calcular precios en el HTML
    calculateFinalPrice(p: Product): number {
      const discount = p.discount || 0;
      return p.price - (p.price * (discount / 100));
    }
  }

  