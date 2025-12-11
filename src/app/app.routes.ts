import { Routes } from '@angular/router';
import { LoginPage } from './pages/login-page/login-page';
import { onlyPublicUserGuard } from './guards/only-public-user-guard';
import { RegisterPage } from './pages/register-page/register-page';
import { Home } from './components/home/home';
import { RestaurantsPage } from './pages/restaurants-page/restaurants-page';
import { RestaurantsMenu } from './components/restaurants-menu/restaurants-menu';
import { Configuracion } from './pages/configuracion/configuracion';
import { onlyLoggedUserGuard } from './guards/only-logged-user-guard';
import { RestaurantsProduct } from './components/restaurants-product/restaurants-product';
import { CategoriasEdicion } from './components/categorias-edicion/categorias-edicion';

export const routes: Routes = [
    {
        path:"login",
        component:LoginPage,
    },
   {
    path:"register",
    component:RegisterPage,
   },
   {
    path:"restaurants",
    component:RestaurantsPage,
   },
   {
    path:"restaurants-menu/:RestaurantName",
    component:RestaurantsMenu,
   },
   {
  path: 'configuracion',
  component: Configuracion, 
  canActivate: [onlyLoggedUserGuard] 
},
{
    path: 'products/edit/:idProduct', //corregir 
    component: RestaurantsProduct,
    canActivate: [onlyLoggedUserGuard] 
  },
  {
    path: 'categories/edit/:idCategory', //corregir 
    component: CategoriasEdicion,
    canActivate: [onlyLoggedUserGuard]
  },
   {
    path:"**",
    component:Home,
   },
   
]
