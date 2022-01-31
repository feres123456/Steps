import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from "@angular/forms";
import { ServiceService } from '../service.service';

@Component({
  selector: 'app-bookstype',
  templateUrl: './bookstype.component.html',
  styleUrls: ['./bookstype.component.css']
})
export class BookstypeComponent implements OnInit {
  form: FormGroup;
  formupdate: FormGroup;

  addform = new FormGroup({
    name: new FormControl(''),
  })


  updateform = new FormGroup({
    name: new FormControl(''),
    id: new FormControl()
  })

  constructor(public fb: FormBuilder, private book: ServiceService) {


  }
  collection
  ngOnInit(): void {
    this.book.gettypebooks().subscribe((result) => {
      this.collection = result;
    })
  }

  /* event to read file
  onFileSeletected(event) {
  const file = (event.target as HTMLInputElement).files[0];
  this.form.patchValue({
    avatar : file
  });
  this.form.get('avatar').updateValueAndValidity()
  }
*/

  Employeesadd
  submitForm() {
    console.warn(this.addform.value)
    this.book.addtypebooks(this.addform.value).subscribe((resultat) => {
      this.Employeesadd = "sucess"
      window.location.reload()
    })
  }

  updategetid(id){
    this.updateform.patchValue({
      id: id
    });
  }


  updateres
  updatetypebooks(id) {
    this.book.updatetypebooks(this.updateform.value).subscribe((res) => {
      this.updateres = "Sucess Update...!"
      window.location.reload()


    })
  }

deletedmsg
  delete(id){
    this.book.deletetypebooks(id).subscribe(()=>{
      this.deletedmsg = "Deleted...!"
      window.location.reload()
    })
  }


}
