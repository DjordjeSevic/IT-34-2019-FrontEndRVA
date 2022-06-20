import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './components/core/about/about.component';
import { AuthorComponent } from './components/core/author/author.component';
import { HomeComponent } from './components/core/home/home.component';
import { DepartmanComponent } from './components/model/departman/departman.component';
import { FakultetComponent } from './components/model/fakultet/fakultet.component';
import { StatusComponent } from './components/model/status/status.component';
import { StudentComponent } from './components/model/student/student.component';

const routes: Routes = [
  {path:'fakultet', component: FakultetComponent},
  {path:'status', component: StatusComponent},
  {path:'departman', component: DepartmanComponent},
  {path:'author', component: AuthorComponent},
  {path:'about', component: AboutComponent},
  {path:'home', component: HomeComponent},
  {path:'', redirectTo: '/home', pathMatch:'full'},
  {path:'student', component: StudentComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
