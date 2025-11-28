import { inject, Injectable } from '@angular/core';
import { AuthService } from './auth-service';
import { RestaurantService } from './restaurant-service';
import { RestaurantsMenu } from '../components/restaurants-menu/restaurants-menu';
import { NewCategory } from '../Interfaces/Categories';

@Injectable({
  providedIn: 'root'
})

export class CategoriesService {
    aleatorio = Math.random();
    authService = inject(AuthService);
    categories: RestaurantsMenu[] = [];

    async getCategories() {
        const res = await fetch("https://w370351.ferozo.com/api/restaurants/categories",{
            headers: {
                Authorization: "Bearer "+this.authService.token,
            },
        });

        if (!res.ok) return;
        const resCategories: RestaurantsMenu[] = await res.json();
        this.categories = resCategories;
        return resCategories;
    }
    async getCategoryById(id: string | number) {
        const res = await fetch('https://w370351.ferozo.com/api/restaurants/categories/' + id,  {
            headers:{
                Authorization: "Bearer "+this.authService.token,
            },
        });
        if (!res.ok) return;
        const resCategories: RestaurantService = await res.json();
        return resCategories;
        }
    async addCategory (newCategory: NewCategory) {
        const res = await fetch("https://w370351.ferozo.com/api/restaurants/categories", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                Authorization: "Bearer " + this.authService.token,
      },
      body: JSON.stringify(newCategory),
    });
    if (!res.ok) return;
    const resCategory: RestaurantsMenu = await res.json();
    this.categories.push(resCategory);
    return resCategory;
    }  
    async editCategory(categoryEdited: RestaurantsMenu) {
        const res = await fetch ("https://w370351.ferozo.com/api/restaurants/categories/" + categoryEdited.id, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + this.authService.token,
        },
        body: JSON.stringify(categoryEdited)
    });
    if (!res.ok) return;

        /**edita la lista reemplazando solamente el que editamos  */
    this.categories = this.categories.map(category => {
        if (category.id === categoryEdited.id) {
            return categoryEdited;
        };
        return category;
    });
    return categoryEdited;
    }
    async deleteCategory(id:string | number) {
        const res = await fetch('https://w370351.ferozo.com/api/restaurants/categories/' + id, {
            method: "DELETE",
            headers:{
                Authorization: "Bearer "+this.authService.token,
            },
        });
        if (!res.ok) return false;
        this.categories = this.categories.filter(category => category.id !== id);
        return true;
    }
}


        
    


