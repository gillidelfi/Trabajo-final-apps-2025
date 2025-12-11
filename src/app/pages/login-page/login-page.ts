// import { Component, inject } from '@angular/core';
// import { RouterModule } from '@angular/router';
// import { AuthService } from '../../services/auth-service';
// import { FormsModule, NgForm } from '@angular/forms';
// import { Spinner } from '../../components/spinner/spinner';


// @Component({
//   selector: 'app-login-page',
//   imports: [RouterModule, FormsModule,Spinner],
//   templateUrl: './login-page.html',
//   styleUrl: './login-page.scss'
// })
// export class LoginPage {
//   errorLogin = false;
//   authService = inject (AuthService);
//   isLoading = false;


//   async login(form:NgForm){
//     console.log(form.value)
//     this.errorLogin = false;
//     if(!form.value.restaurantName || !form.value.password){
//       this.errorLogin = true;
//       return
//     }
//     this.isLoading =  true;
//     await this.authService.login (form.value);
//     this.isLoading = false;
//     this.errorLogin = true; //terrible error
//   }


// }
import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router'; // Importar Router
import { AuthService } from '../../services/auth-service';
import { FormsModule, NgForm } from '@angular/forms';
import { Spinner } from '../../components/spinner/spinner';


@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [RouterModule, FormsModule, Spinner],
  templateUrl: './login-page.html',
  styleUrl: './login-page.scss'
})
export class LoginPage {
  errorLogin = false;
  authService = inject(AuthService);
  router = inject(Router);
  isLoading = false;


  async login(form: NgForm) {
    this.errorLogin = false;
   
    // Validaciones básicas
    if (!form.value.restaurantName || !form.value.password) {
      this.errorLogin = true;
      return;
    }


    this.isLoading = true;


    // 1. Llamamos al servicio y esperamos la respuesta (true/false)
    const loginExitoso = await this.authService.login(form.value);
   
    this.isLoading = false;


    if (loginExitoso) {
      // CASO ÉXITO: Redirigir al panel de administración
      // existe? en tu app.routes.ts
      this.router.navigate(['/configuracion']);
    } else {
      //  CASO ERROR: Mostrar mensaje rojo
      this.errorLogin = true;
    }
  }
}
