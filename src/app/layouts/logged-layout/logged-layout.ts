import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth-service';
import Swal from 'sweetalert2'
import { RouterOutlet, RouterLink } from '@angular/router';


@Component({
  selector: 'app-logged-layout',
  imports: [RouterOutlet, RouterLink],
  templateUrl: './logged-layout.html',
  styleUrl: './logged-layout.scss',
})
export class LoggedLayout {
  authService = inject(AuthService);
  openLogoutModal () {
    Swal.fire({
      title: "Desea cerrar sesión?",
      showDenyButton: true,
      showCancelButton: true,
      showCloseButton: false,
      cancelButtonText: "No",
      denyButtonText: `Cerra sesión`
    }).then((result) => {
      if (result.isDenied) { //reviso que haya clickeado en boton rojo: cerra sesion
        this.authService.logout();
      }
    });
  }

}
