import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceService } from '../service.service';



@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  userauth 
  admin 
  constructor( private router : Router , private service: ServiceService) {
    this.admin = localStorage.getItem("admin")
    this.userauth = localStorage.getItem("Auth")
   }

  ngOnInit(): void {
  
  }

  logout(){
    localStorage.clear()
    this.router.navigate([''])  

  }

}
