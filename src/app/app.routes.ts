import { Routes } from '@angular/router';
import { LoginPage } from './pages/login-page/login-page';
import { onlyPublicUserGuard } from './guards/only-public-user-guard';
import { RegisterPage } from './pages/register-page/register-page';
import { Home } from './components/home/home';
import { RestaurantsPage } from './pages/restaurants-page/restaurants-page';
import { RestaurantsMenu } from './components/restaurants-menu/restaurants-menu';
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
    path:"**",
    component:Home,
   },
]

