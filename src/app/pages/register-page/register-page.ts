import { Component, inject, viewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Spinner } from '../../components/spinner/spinner';
import { Router, RouterModule } from '@angular/router';
import { UsersService } from '../../services/user-service';
import { UserData } from '../../Interfaces/UserData';
import { AuthService } from '../../services/auth-service';


@Component({
  selector: 'app-register-page',
  imports: [RouterModule, FormsModule, Spinner],
  templateUrl: './register-page.html',
  styleUrl: './register-page.scss',
})
export class RegisterPage {
  errorRegister=false;
  usersService= inject(UsersService);
  authService= inject(AuthService);
  isLoading = false;
  router = inject(Router);
  isEditing = false;


  form = viewChild<NgForm>('registerForm');
  userData: UserData = {
    id: 0,
    restaurantName: '',
    firstName: '',
    lastName: '',
    address: '',
    phoneNumber: '',
    password: '',
    password2: ''
  };


  async ngOnInit() {
    if (this.router.url.includes('/profile/edit')) {
      this.isEditing = true;
      await this.loadUserData();
    }
  }


  async loadUserData() {
    this.isLoading = true;
    try {
      const userId = this.authService.getUserId();
      if (userId) {
        const user = await this.usersService.getUsersbyId(userId);
        if (user) {
          this.userData = {
            id: user.id, 
            restaurantName: user.restaurantName,
            firstName: user.firstName,
            lastName: user.lastName,
            address: user.address,
            phoneNumber: user.phoneNumber,
            password: '',
            password2: ''
          };
        }
      }
    } catch (error) {
      console.error(error);
    } finally {
      this.isLoading = false;
    }
  }


  async register(form: NgForm) {
    this.errorRegister = false;
   
    if (form.value.password !== form.value.password2) {
      alert("Las contraseñas no coinciden");
      return;
    }

    this.isLoading = true;

    try {
      let result;

      if (this.isEditing) {
        // Combinamos el ID original con los datos del formulario
        const updateData = {
          ...form.value,
          id: this.userData.id,
          userName: form.value.firstName 
        };
       
        result = await this.usersService.updateUser(updateData);
       
        if (result) {
          this.router.navigate(['/configuracion']); 
        } else {
          this.errorRegister = true;
        }


      } else {
        result = await this.usersService.register(form.value);
       
        if (result) {
          this.router.navigate(["/login"]);
        } else {
          this.errorRegister = true;
        }
      }

    } catch (error) {
      console.error("Error:", error);
      this.errorRegister = true;
    } finally {
      this.isLoading = false;
    }
  }
}






