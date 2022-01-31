import { Component, OnInit, ɵNOT_FOUND_CHECK_ONLY_ELEMENT_INJECTOR } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from "@angular/forms";
import { ServiceService } from '../service.service';


@Component({
  selector: 'app-authors',
  templateUrl: './authors.component.html',
  styleUrls: ['./authors.component.css']
})
export class AuthorsComponent implements OnInit {
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
    this.book.getauthors().subscribe((result) => {
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
    //  var formData : any = new FormData();
    // formData.append("name",this.form.get('name').value);
    console.warn(this.addform.value)
    this.book.addauthors(this.addform.value).subscribe((resultat) => {
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
  updateauthors(id) {
    
    this.book.updateauthors(this.updateform.value).subscribe((res) => {
      this.updateres = "Sucess Update...!"
      window.location.reload()

    })
  }

deletedmsg
  delete(id){
    this.book.deleteauth(id).subscribe(()=>{
      this.deletedmsg = "Deleted...!"
      window.location.reload()
    })
  }

}
