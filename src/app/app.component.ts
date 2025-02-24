import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoginComponent } from './modules/Login/component/login/login.component';
import {  provideHttpClient } from '@angular/common/http';
// import  {mdb} from 'mdb-ui-kit'; // lib

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,LoginComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  // 
  title = 'ציוני בגרויות';
}
