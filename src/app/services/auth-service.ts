import { inject, Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginData } from '../Interfaces/Auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnInit{
  router = inject(Router);
  token : null|string = localStorage.getItem("token");
  revisionTokenInterval: number|undefined;

  ngOnInit(): void {
    //si tengo sesion iniciada revisa que no este vencida 
    if(this.token){
      this.revisionTokenInterval = this.revisionToken()
    }
  }
  
  /**autentica al asuario en el back y nos devuelve el token */
  async login(loginData: LoginData){
    const res = await fetch("https://w370351.ferozo.com/api/Authentication/login",
      { 
        method: "POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(loginData)
      }
    )
    if(res.ok){
      this.token = await res.text()
      localStorage.setItem("token",this.token);
      this.router.navigate(["/home"])
    }
  }

  logout(){
    this.token = null;
    localStorage.removeItem("token");/** guarda variables en el navegador para que no se borren al cambiar de pagina o dia */
    this.router.navigate(["/login"]);
  }

  parseJwt(token: string) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
  };

  revisionToken(){
    return setInterval(() => {
      if(this.token){
        const claims = this.parseJwt(this.token);
        if(new Date(claims.exp * 1000) < new Date()) {
          this.logout()
        }
      }
    }, 600)
  }

  getUserId() {
    if(this.token){
      const claims = this.parseJwt(this.token);
      return claims.sub;
    }
    return null;
  }
}