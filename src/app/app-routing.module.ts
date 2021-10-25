import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/auth/login/login.component';
import { FacultyRegiserationComponent } from './components/institute/faculty/faculty-regiseration/faculty-regiseration.component';
import { StudentRegiserationComponent } from './components/institute/students/student-regiseration/student-regiseration.component';
import { HomeComponent } from './components/ipages/home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'faculty-registration', component: FacultyRegiserationComponent },
  { path: 'student-registration', component: StudentRegiserationComponent },
  { path: 'login', component: LoginComponent },
  // { path: 'class' ,component: ClassComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
