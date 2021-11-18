import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/auth/login/login.component';
import { FacultyRegiserationComponent } from './components/institute/faculty/faculty-regiseration/faculty-regiseration.component';
import { StudentRegiserationComponent } from './components/institute/students/student-regiseration/student-regiseration.component';
import { HomeComponent } from './components/ipages/home/home.component';
import { WhatsNewComponent } from './components/feature/whats-new/whats-new.component';
import { FacultyComponent } from './components/institute/faculty/faculty.component';
import { StudentsComponent } from './components/institute/students/students.component';
import { ClassesComponent } from './components/classes/classes.component';
import { TestsheetComponent } from './components/ipages/testsheet/testsheet.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'faculty-registration', component: FacultyRegiserationComponent },
  { path: 'student-registration', component: StudentRegiserationComponent },
  { path: 'faculty', component: FacultyComponent },
  { path: 'student', component: StudentsComponent },
  { path: 'classes' ,component: ClassesComponent },
  { path: 'testsheet', component: TestsheetComponent },
  { path: 'login', component: LoginComponent },
  { path: 'whats-new', component: WhatsNewComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
