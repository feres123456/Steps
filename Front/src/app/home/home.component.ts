import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from "@angular/forms";
import { ServiceService } from '../service.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  addform = new FormGroup({
    name: new FormControl(''),
  })
  constructor(public fb: FormBuilder, private book: ServiceService) {

  }
 
  collection
  ngOnInit(): void {

  }
 


  
}
