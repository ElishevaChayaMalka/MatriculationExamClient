import { Routes } from '@angular/router';
import { MatriculationExamComponent } from './matriculation-exam/matriculation-exam.component';
import { LoginComponent } from './modules/Login/component/login/login.component';


export const routes: Routes = [
  { path: 'matriculation-exam', component: MatriculationExamComponent },
  // { path: 'matriculation-exam/:id', component: MatriculationExamComponent },
  { path: 'Login', component: LoginComponent },
  // { path: 'Classes', component: LoginComponent },
  // { path: 'Classes/:nameofclass', component: LoginComponent },

  {path:'',component:LoginComponent}
];
