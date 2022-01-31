import { Component, OnInit } from '@angular/core';
import {FormBuilder , FormGroup} from "@angular/forms";
import {ServiceService} from '../service.service' ;


@Component({
  selector: 'app-livre',
  templateUrl: './livre.component.html',
  styleUrls: ['./livre.component.css']
})
export class LivreComponent implements OnInit {
 form: FormGroup;
 updateform : FormGroup;
  constructor(public fb: FormBuilder , private book:ServiceService) {
    
    this.form = this.fb.group ( {
      booksname : [''],
      authorsname : [''],
      bookstype : [''],
      avatar : [null],

    })


    this.updateform = this.fb.group ( {
      id : [],
      booksname : [''],
      authorsname : [''],
      bookstype : [''],
      avatar : [null],
    })




   }
   collection
   authorsname
   collectiontypes
  ngOnInit(): void {
    this.book.getauthors().subscribe((result) => {
      this.authorsname = result;
    })

    this.book.gettypebooks().subscribe((res)=> {
    this.collectiontypes = res
    })
    

    this.book.getbooks().subscribe((result)=>{
      this.collection = result ;
    })
  }


 updategetid(id){
  this.updateform.patchValue({
    id: id
  });

 }
 

  onFileSeletected(event) {
  const file = (event.target as HTMLInputElement).files[0];
  this.form.patchValue({
    avatar : file
  });
  this.form.get('avatar').updateValueAndValidity()
  }

  onFileSeletectedupdate(event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.updateform.patchValue({
      avatar : file
    });
    this.updateform.get('avatar').updateValueAndValidity()
    }

  onChange(deviceValue) {
    this.form.patchValue({
      authorsname : deviceValue
    })
}


  onChangetype(deviceValue) {
  this.form.patchValue({
    bookstype : deviceValue
  })
}

onChangeupdate(deviceValue) {
  this.updateform.patchValue({
    authorsname : deviceValue
  })
}


onChangetypeupdate(deviceValue) {
this.updateform.patchValue({
  bookstype : deviceValue
})
}
 messageadded
   submitForm(){
     var formData : any = new FormData();
     formData.append("booksname",this.form.get('booksname').value);
     formData.append("authorsname",this.form.get('authorsname').value);
     formData.append("bookstype",this.form.get('bookstype').value);
     formData.append("avatar",this.form.get('avatar').value);


     this.book.addbooks(formData).subscribe((res)=> {
       this.messageadded = " Book Added...!"
       window.location.reload()
     })
   }
 messagrupdated
   submitupdateform(){
    var formData : any = new FormData();
    formData.append("id",this.updateform.get('id').value);
    formData.append("booksname",this.updateform.get('booksname').value);
    formData.append("authorsname",this.updateform.get('authorsname').value);
    formData.append("bookstype",this.updateform.get('bookstype').value);
    formData.append("avatar",this.updateform.get('avatar').value);


    this.book.updatebooks(formData).subscribe((res)=> {
      console.log("adddddd")
      this.messagrupdated = " Updated...!"
      window.location.reload()
    })
  }




   deletebooks(id){
    this.book.deletebooks(id).subscribe(()=>{
      window.location.reload()
    })
  }

}
