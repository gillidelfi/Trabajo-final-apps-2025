
import { inject, Injectable } from '@angular/core';
import { AuthService } from './auth-service';
import { User } from '../Interfaces/User';

@Injectable({
  providedIn: 'root'
})

export class RestaurantService {
  aleatorio = Math.random();
  authService = inject(AuthService);

  users: User[] = []

  /** Obtiene los restaurantes del backend */
  async getusers() {
    const res = await fetch("https://w370351.ferozo.com/api/users",
      {
        headers:{
          Authorization: "Bearer "+this.authService.token,
        }
      }
    )
    const resJson: User[] = await res.json()
    this.users = resJson;
  }

}