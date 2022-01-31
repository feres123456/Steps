
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginguardService {
  isUser
  constructor(private route:Router) {
   }


   
  canActivate(route:ActivatedRouteSnapshot,state:RouterStateSnapshot): Promise<boolean>
  {

    
    return new Promise(resolve => {
      this.isUser = localStorage.getItem("Auth")
      
      if(this.isUser === "true"){
        resolve(false)
        this.isUser = "false"
        this.route.navigate([''])   
      } else{
        resolve(true)   
      }
        
        })
      }
    }

