import { Component, inject, input, OnInit, viewChild } from '@angular/core';
import { Spinner } from '../spinner/spinner';
import { FormsModule, NgForm } from '@angular/forms';
import { CategoriesService } from '../../services/categories-service';
import { RestaurantsMenu } from '../restaurants-menu/restaurants-menu';
import { Router } from '@angular/router';
import { NewCategory } from '../../Interfaces/Categories';

@Component({
  selector: 'app-restaurants-categories',
  imports: [Spinner, FormsModule],
  templateUrl: './restaurants-categories.html',
  styleUrl: './restaurants-categories.scss',
})
export class RestaurantsCategories implements OnInit{
  CategoriesService = inject(CategoriesService);
  idCategory = input<number>();
  categoryOriginal: RestaurantsMenu | undefined = undefined;
  form = viewChild<NgForm>('newCategoryForm');
  errorEnBack = false;
  isLoading = false;
  router = inject(Router);
categories: any;

  async ngOnInit() {
    if(this.idCategory()){
      this.categoryOriginal = await this.CategoriesService.getCategoryById(this.idCategory()!);
        this.form()?.setValue({
          name: this.categoryOriginal!.name,
          categoryId: this.categoryOriginal!.id
        });
      }
    }
    async handleFormSubmission(form:NgForm){

      this.errorEnBack = false;
      const nuevaCategoria: NewCategory ={
        name: form.value.name
      };
      console.log(nuevaCategoria);
      this.isLoading = true;
      let res;
     
      if(this.idCategory()){
        res = await this.CategoriesService.editCategory({...nuevaCategoria, id: this.idCategory()!});
      }
      else{
        res = await this.CategoriesService.addCategory(nuevaCategoria);
      }
      console.log(res);
      this.isLoading = false;
      if(!res){
        this.errorEnBack = true;
        return;
      }
      this.router.navigate(['/restaurantMenu']);



  }



  
  


}
