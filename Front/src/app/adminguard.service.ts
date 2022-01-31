
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AdminguardService {
  isUser
  constructor(private route:Router) {
   }


   
  canActivate(route:ActivatedRouteSnapshot,state:RouterStateSnapshot): Promise<boolean>
  {

    
    return new Promise(resolve => {
      this.isUser = localStorage.getItem("admin")
      
      if(this.isUser ==="true"){
        resolve(true)
      } else{
        this.isUser = "false"
        this.route.navigate([''])      
      }
        
        })
      }
    }

