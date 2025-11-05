import { Component, inject, input, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth-service';
import { RouterModule } from '@angular/router';
import { RestaurantService } from '../../services/restaurant-service';
import { FormsModule } from '@angular/forms';
import { RestaurantsListItems } from "../../components/restaurants-list-items/restaurants-list-items";
import { User } from '../../Interfaces/User';

@Component({
  selector: 'app-restaurants-page',
  imports: [RouterModule, FormsModule, RestaurantsListItems],
  templateUrl: './restaurants-page.html',
  styleUrl: './restaurants-page.scss',
})
export class RestaurantsPage implements OnInit{
 
    ngOnInit(): void {
      this.restaurantService.getusers();
    }
    authservice = inject(AuthService);
    restaurantService = inject(RestaurantService);
    user = input.required<User>();
  
  }

