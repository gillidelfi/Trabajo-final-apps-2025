import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router'; 
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
   
    if (!form.value.restaurantName || !form.value.password) {
      this.errorLogin = true;
      return;
    }
    this.isLoading = true;

    const loginExitoso = await this.authService.login(form.value);
   
    this.isLoading = false;
    if (loginExitoso) {
    
      this.router.navigate(['/configuracion']);
    } else {
      this.errorLogin = true;
    }
  }
}
