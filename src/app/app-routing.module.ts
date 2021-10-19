import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FacultyComponent } from './components/institute/faculty/faculty.component';
import { StudentsComponent } from './components/institute/students/students.component';
import { HomeComponent } from './components/ipages/home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'faculty', component: FacultyComponent },
  { path: 'students', component: StudentsComponent }
  // { path: 'class' ,component: ClassComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
