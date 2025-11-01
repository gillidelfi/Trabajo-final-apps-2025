import { Routes } from '@angular/router';
import { LoginPage } from './pages/login-page/login-page';
import { onlyPublicUserGuard } from './guards/only-public-user-guard';
import { RegisterPage } from './pages/register-page/register-page';
import { Home } from './components/home/home';

export const routes: Routes = [
    {
        path:"login",
        component:LoginPage,
        canActivate: [onlyPublicUserGuard]
    },
   {
    path:"register",
    component:RegisterPage,
    canActivate: [onlyPublicUserGuard]

   },
   {
    path:"restaurants",
    component:Home,
    canActivate: [onlyPublicUserGuard]
   },
]

  /*.hay que crear este layout?
  {
     path:"",
    component:LoggedLayout, 
    canActivateChild: [onlyLoggedUserGuard],
    children: [
        {    
            path:"",
            component:
        },
    ]
   }    
]; */
