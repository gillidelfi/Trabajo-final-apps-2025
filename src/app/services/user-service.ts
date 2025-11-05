import { Injectable } from "@angular/core";
import { NewUser } from "../Interfaces/User";

@Injectable({
    providedIn: 'root'
})
export class UsersService{

    async register(registerData: NewUser){
       return await fetch("https://w370351.ferozo.com/api/users",
            {
                method: "POST",
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(registerData)
            });
            
    }
}
