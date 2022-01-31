import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from "@angular/forms";
import { ServiceService } from '../service.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  addform = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  })
  constructor(public fb: FormBuilder , private service: ServiceService , private router : Router) { }

  ngOnInit(): void {

     
    const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('container');

signUpButton.addEventListener('click', () => {
	container.classList.add("right-panel-active");
  
});

signInButton.addEventListener('click', () => {
	container.classList.remove("right-panel-active");
});


  }
replymsg
loginsuccesmsg
loginfail
  login(){
    this.service.login(this.addform.value).subscribe({
      next: data => {
        this.replymsg = data
        if(this.replymsg.auth === "true"){
          localStorage.setItem("Auth",this.replymsg.auth)
          localStorage.setItem("token",this.replymsg.token)
          localStorage.setItem("user",this.replymsg.user)
          if(this.replymsg.admin === "true"){
          localStorage.setItem("admin",this.replymsg.admin)
          }
          this.loginfail = ""
          this.loginsuccesmsg="Login sucess" 
         this.router.navigate(['']).then( ()=> {
           window.location.reload()}
         )  
          
        }else{
          this.loginfail = "invalid password or email"

        }
  
      },
      error: error => {
           console.warn("noo",error)      
          }
  })

  }

}
