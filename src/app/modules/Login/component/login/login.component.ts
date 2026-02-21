import { HttpClient, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { getData } from '../../../../Services/getData.service';
import { User } from '../../../../Types/User';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule,
    ReactiveFormsModule, HttpClientModule, CommonModule
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  products: any;
  id: string = "";
  classStage: string = "";
  selectedClass: string | null = null;
  error: string = "";
  logoPath: string = 'assets/logo.jpg';
  isLoading: boolean = true;
  classes: string[] = [];
  constructor(private httpClient: HttpClient, private LoginServiceService: getData, private router: Router, private dataService: getData) { }
  ngOnInit(): void {
    this.getClassesSheetsName();
    this.logoPath = 'assets/logo.png';
  }

  isValid() {
    
    const idRegex = /^\d{9}$/;
    const isValidFormat = idRegex.test(this.id);
    if (this.id === "") {
      this.error = "נא להזין תעודת זהות!";
      return;
    }
    if (!isValidFormat) {
      this.error = "תעודת זהות לא תקינה, נא להזין 9 ספרות.";
      return;
    }
    if (!(isValidFormat && this.selectedClass)) {
      this.error = "יש להזין שם כיתה";
      return;
    }
    else if (isValidFormat && this.selectedClass)
      this.getData();

  }
  getData() {

    this.isLoading = true;
    this.LoginServiceService.getUserById(new User(this.id, this.selectedClass ?? ''))
      .subscribe({
        next: (response) => {
          this.isLoading = false;
        },
        error: (err) => {
          console.error(err);
          this.isLoading = false; // מפסיק את ה-spinner במקרה של שגיאה
          this.error = "שגיאה בקבלת הנתונים, אנא נסה שוב.";
        }
      });

  }
  classChoose() {

  }
  getClassesSheetsName() {
    console.log('Fetching classes from:', `${environment.apiUrl}/Matriculation/getClasses`);
    
    this.httpClient.get(`${environment.apiUrl}/Matriculation/getClasses`, { 
      observe: 'response' 
    })
      .subscribe({
        next: (response: any) => {
          console.log('Full response:', response);
          console.log('Response status:', response.status);
          console.log('Response body:', response.body);
          console.log('Response headers:', response.headers);
          
          const data = response.body;
          console.log(data,'dataa');
          
          if (data && Array.isArray(data)) {
            this.classes = data?.filter((c: String) => c.includes("כיתה"));
            console.log('Classes loaded:', this.classes);
          } else {
            this.classes = [];
            console.error("Invalid data format received:", data);
          }
          this.isLoading = false;
        },
        error: (error) => {
          console.error("Error fetching classes - Full error:", error);
          console.error("Error status:", error.status);
          console.error("Error message:", error.message);
          console.error("Error headers:", error.headers);
          alert("שגיאה בטעינת רשימת הכיתות. אנא רענן את הדף.");
        }
      });


  }
}

