import { Component, OnInit } from '@angular/core';
import {ServiceService} from '../service.service' ;
import { FormBuilder, FormGroup, FormControl } from "@angular/forms";


@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {
  updateform = new FormGroup({
    employees: new FormControl("true"),
    id: new FormControl()
  })
  updateadmin = new FormGroup({
    admin: new FormControl("true"),
    id: new FormControl()
  })
  deleteform = new FormGroup({
    employees: new FormControl("false"),
    id: new FormControl()
  })


  deleteadmin = new FormGroup({
    admin: new FormControl("false"),
    id: new FormControl()
  })
  
  constructor(private service:ServiceService) {
   }
   listusers
  ngOnInit(): void {
    this.service.getlistusers().subscribe((res)=> {
    this.listusers = res ; 
    })
  }
  
  updateres
  addemployees(id){
    this.updateform.patchValue({
      id: id
    });
    this.service.empstat(this.updateform.value).subscribe((res) => {
      this.updateres = "Sucess Update...!"
      window.location.reload()

    })

  }

  addadmin(id){
    this.updateadmin.patchValue({
      id: id
    });
    this.service.adminupdate(this.updateadmin.value).subscribe((res) => {
      this.updateres = "Sucess Update...!"
      window.location.reload()

    })

  }


  Delete(id){
    this.deleteform.patchValue({
      id: id
    });
    this.service.empstat(this.deleteform.value).subscribe((res) => {
      this.updateres = "Sucess Update...!"
      window.location.reload()
    })

  }


  Deleteadmin(id){
    this.deleteadmin.patchValue({
      id: id
    });
    this.service.adminupdate(this.deleteadmin.value).subscribe((res) => {
      this.updateres = "Sucess Update...!"
      window.location.reload()
    })

  }

}
