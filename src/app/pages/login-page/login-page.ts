import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth-service';
import { FormsModule, NgForm } from '@angular/forms';
import { Spinner } from '../../components/spinner/spinner';

@Component({
  selector: 'app-login-page',
  imports: [RouterModule, FormsModule,Spinner],
  templateUrl: './login-page.html',
  styleUrl: './login-page.scss'
})
export class LoginPage {
  errorLogin = false;
  authService = inject (AuthService);
  isLoading = false;

  async login(form:NgForm){
    console.log(form.value)
    this.errorLogin = false;
    if(!form.value.restaurantName || !form.value.password){
      this.errorLogin = true;
      return
    }
    this.isLoading =  true;
    await this.authService.login (form.value);
    this.isLoading = false;
    this.errorLogin = true;
  }

}