import { Component, inject, OnInit, } from '@angular/core';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth-service';
import { UsersService } from '../../services/user-service';
import { User } from '../../Interfaces/User';

@Component({
  selector: 'app-settings',
  imports: [RouterModule, RouterLink],
  templateUrl: './configuracion.html',
  styleUrl: './configuracion.scss'
})
export class Configuracion implements OnInit {
  userService = inject(UsersService);
  authService = inject(AuthService);
  router = inject(Router);

  user: User | undefined = undefined;
  cargando = true;
  error = '';
  showDeleteConfirm = false;
  isDeleting = false;

  async ngOnInit() {
    try {
      const userId = this.authService.getUserId();

      if (!userId) {
        this.error = 'No hay sesión activa';
        this.cargando = false;
        return;
      }
      this.user = await this.userService.getUsersbyId(userId);

      if (!this.user) {
        this.error = 'No es posible cargar los datos del usuario';
      }
    } catch (err) {
      this.error = 'Error al cargar la información del usuario';
    } finally {
      this.cargando = false;
    }
  }

  openDeleteConfirm() {
    this.showDeleteConfirm = true;
  }

  closeDeleteConfirm() {
    this.showDeleteConfirm = false;
  }

  async deleteUser() {
    if (!this.user) return;

    this.isDeleting = true;

    try {
      const result = await this.userService.deleteUser(this.user.id);

      if (result) {
        this.authService.logout();
      } else {
        this.error = 'No se pudo eliminar la cuenta';
        this.showDeleteConfirm = false;
        this.isDeleting = false;
      }
    } catch (err) {
      this.error = 'Error al eliminar la cuenta';
      console.error(err);
      this.showDeleteConfirm = false;
      this.isDeleting = false;
    }
  }
}
