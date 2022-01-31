import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from "@angular/forms";
import { ServiceService } from '../service.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  addform = new FormGroup({
    name: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
  })

  constructor(public fb: FormBuilder , private service: ServiceService) { }

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




msgsuccess
msgerror
  register(){
   this.service.register(this.addform.value).subscribe({
    next: data => {
        this.msgsuccess="account already created try to Login"
        this.msgerror = ""


    },
    error: error => {
        this.msgerror = "this account already exists "
    }
})
  }

}
