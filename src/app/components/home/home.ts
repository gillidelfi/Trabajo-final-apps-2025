import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  router = inject(Router);
  
  Login() {
    this.router.navigate(['/login']);
  }
  Invitado() {
    this.router.navigate(['/']);
  }
  Register() {
    this.router.navigate(['/register']);
  }
}
