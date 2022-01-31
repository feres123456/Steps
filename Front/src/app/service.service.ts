import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  web ="http://localhost:9000/addbooks"
  url="https://jsonplaceholder.typicode.com/posts"


  constructor(private http:HttpClient) { 
  }



  t = localStorage.getItem("token")

   headers_object = new HttpHeaders({
   'Content-Type': 'application/json',
    'Authorization':  this.t
 });

      httpOptions = {
       headers: this.headers_object
     };


  getList(){
    return this.http.get(this.url);
  }

  getlistusers(){
    return this.http.get("http://localhost:9000/listusers")
    
  }

  getbooks () {
    return this.http.get("http://localhost:9000/getbooks")
  }

  addbooks(data){
    return this.http.post(this.web,data)
  }
  deletebooks(id){
    return this.http.delete(`http://localhost:9000/deletebooks/${id}`)
    }
    
    updatebooks(data){
      return this.http.put("http://localhost:9000/updatebooks",data)
    }

  getemployees() {
    return this.http.get("http://localhost:9000/employees")
  }

  addemployees(data){
    return this.http.post("http://localhost:9000/addemp",data)
  }

  addauthors(data){
    return this.http.post("http://localhost:9000/addauthors",data)

  }

  getauthors(){
    return this.http.get("http://localhost:9000/getauthors")
  }

  updateauthors(data){
    return this.http.put("http://localhost:9000/updateauthors",data)
  }


deleteauth(id){
  return this.http.delete(`http://localhost:9000/deleteauth/${id}`)
}


addtypebooks(data){
  return this.http.post("http://localhost:9000/addtypebooks",data)

}

gettypebooks(){
  return this.http.get("http://localhost:9000/gettypebooks")
  
}

updatetypebooks(data){
  return this.http.put("http://localhost:9000/updatetypebooks",data)
}


deletetypebooks(id){
return this.http.delete(`http://localhost:9000/deletetypebooks/${id}`)
}


register(data){
  return this.http.post("http://localhost:9000/registre",data)
}

login(data){
  return this.http.post("http://localhost:9000/login",data)
}


empstat(data){
  return this.http.put("http://localhost:9000/empstat",data)
}

adminupdate(data){
  return this.http.put("http://localhost:9000/adminstat",data)
}
}
