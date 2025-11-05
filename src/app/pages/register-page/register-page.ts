import { Component, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Spinner } from '../../components/spinner/spinner';
import { Router, RouterModule } from '@angular/router';
import { UsersService } from '../../services/user-service';

@Component({
  selector: 'app-register-page',
  imports: [RouterModule, FormsModule, Spinner],
  templateUrl: './register-page.html',
  styleUrl: './register-page.scss',
})
export class RegisterPage {
  errorRegister=false;
  usersService= inject(UsersService);
  isLoading = false;
  router = inject(Router);

  async register(form:NgForm){
    this.errorRegister = false;
    if(!form.value.restaurantName 
      || !form.value.password 
      || !form.value.password2 
      || !form.value.firstName
      || !form.value.lastName
      || !form.value.address
      || !form.value.phoneNumber
      || form.value.password !== form.value.password2){
      this.errorRegister = true;
      return
    }
    this.isLoading = true;
    const res = await this.usersService.register(form.value);
    if(res.ok){
      this.router.navigate(["/login"])
    }
    this.isLoading = false;
    this.errorRegister = true;
  }
}


