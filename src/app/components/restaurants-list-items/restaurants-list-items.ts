import { Component, inject, input } from '@angular/core';
import { RestaurantService } from '../../services/restaurant-service';
import { User } from '../../Interfaces/User';
import { RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-restaurants-list-items',
  imports: [RouterModule],
  templateUrl: './restaurants-list-items.html',
  styleUrl: './restaurants-list-items.scss',
})
export class RestaurantsListItems {

  user = input.required<User>();
  aleatorio = Math.random();
  restaurantService = inject(RestaurantService);
}
