import { Component, inject, input, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth-service';
import { RouterModule } from '@angular/router';
import { UsersService } from '../../services/user-service';
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
      this.userService.getusers();
    }
    authservice = inject(AuthService);
    userService = inject(UsersService);
    user = input.required<User>();
  
  }

