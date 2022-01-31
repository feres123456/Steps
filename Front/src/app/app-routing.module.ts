import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component' ;
import { EmployeesComponent } from './employees/employees.component';
import { RegisterComponent } from './register/register.component';
import { LivreComponent} from './livre/livre.component';
import { AuthorsComponent } from './authors/authors.component';
import { GuardService } from './guard.service';
import { AdminguardService } from './adminguard.service';
import { LoginguardService } from './loginguard.service';


const routes: Routes = [

 { path:'' , component : HomeComponent},
 { path:'employees' , component : EmployeesComponent , canActivate:[AdminguardService]} , 
 { path:'register' , component:RegisterComponent, canActivate:[LoginguardService]},
 { path:'livre' , component:LivreComponent,canActivate:[GuardService]},
 { path:'authors' , component:AuthorsComponent,canActivate:[GuardService]},




];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
