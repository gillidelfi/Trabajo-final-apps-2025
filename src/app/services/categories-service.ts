import { inject, Injectable, signal } from '@angular/core';
import { AuthService } from './auth-service';
import { Category, NewCategory, UpdateCategoryRequestDto } from '../Interfaces/Categories';

@Injectable({
  providedIn: 'root'
})

export class CategoriesService {
    aleatorio = Math.random();
    authService = inject(AuthService);
    categories = signal <Category[]> ([]);
    readonly API_USERS_URL = "https://w370351.ferozo.com/api/Users";
    readonly API_CATEGORIES_URL = "https://w370351.ferozo.com/api/Categories";

    async getCategoriesByRestaurant(restaurantId: number) {
        const res = await fetch(`${this.API_USERS_URL}/${restaurantId}/categories`);
        if (!res.ok) {
            this.categories.set([]);
            return;
        }
        const data = (await res.json()) as Category[];
        this.categories.set(data);
    }
    async addCategory (category: NewCategory) {
        const res = await fetch(`${this.API_CATEGORIES_URL}`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                Authorization: "Bearer ${this.authService.token}"
      },
      body: JSON.stringify(category)
    });
    if (!res.ok) return undefined;
    const newCategory: Category = (await res.json()) as Category;
    this.categories.update(current => [...current, newCategory]);
    return newCategory;
}

    async updateCategory(id: number, categoryData: UpdateCategoryRequestDto) {
        const res = await fetch(`${this.API_CATEGORIES_URL}/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer ${this.authService.token}"
                },
            body: JSON.stringify(categoryData)
        });
        if (!res.ok) return undefined;
        const updatedCategory = (await res.json()) as Category;
        this.categories.update(currentCategories => currentCategories.map(cat =>cat.id === id ? updatedCategory : cat));
        return updatedCategory;
        }
        async deleteCategory(id:string | number) {
            const res = await fetch(`${this.API_CATEGORIES_URL}/${id}`, {
                method: "DELETE",
                headers:{
                    Authorization: "Bearer ${this.authService.token}"
                }
            });
            if (!res.ok) return false;
            this.categories.update (currentCategories => currentCategories.filter(cat => cat.id !== id));
            return true;
        }
    
    // async getCategories() {
    //     const res = await fetch("https://w370351.ferozo.com/api/restaurants/categories",{
    //         headers: {
    //             Authorization: "Bearer "+this.authService.token,
    //         },
    //     });

    //     if (!res.ok) return;
    //     const resCategories: RestaurantsMenu[] = await res.json();
    //     this.categories = resCategories;
    //     return resCategories;
    // }
    // async getCategoryById(id: string | number) {
    //     const res = await fetch('https://w370351.ferozo.com/api/restaurants/categories' + id,  {
    //         headers:{
    //             Authorization: "Bearer "+this.authService.token,
    //         },
    //     });
    //     if (!res.ok) return;
    //     const resCategories: RestaurantService = await res.json();
    //     return resCategories;
    //     }
        
    }


        
    


