import { inject, Injectable } from "@angular/core";
import { NewUser, User } from "../Interfaces/User";
import { AuthService } from "./auth-service";

@Injectable({
    providedIn: 'root'
})
export class UsersService{
authService = inject(AuthService);


    async register(registerData: NewUser){
       return await fetch("https://w370351.ferozo.com/api/users",
            {
                method: "POST",
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(registerData)
            });
            
    }
    users: User[] = []
    
      /** Obtiene los restaurantes del backend */
      async getusers() {
        const res = await fetch("https://w370351.ferozo.com/api/users",
          {
            headers:{
              Authorization: "Bearer "+this.authService.token,
            }
          }
        )
        const resJson: User[] = await res.json()
        this.users = resJson;
      }
}
