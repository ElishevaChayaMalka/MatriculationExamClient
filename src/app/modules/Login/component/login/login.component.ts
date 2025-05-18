import { HttpClient, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { getData } from '../../../../Services/getData.service';
import { User } from '../../../../Types/User';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule,
    ReactiveFormsModule, HttpClientModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  products: any;
  id: string = "";
  classStage: string = "";
  selectedClass: { name: string; number: string } | null = null;
  error: string = "";
  logoPath: string = 'assets/logo.png';
  isLoading: boolean = false;
  classes: any;
  constructor(private httpClient: HttpClient, private LoginServiceService: getData, private router: Router, private dataService: getData) { }
  ngOnInit(): void {
    this.getClassesSheetsName();
    this.logoPath = 'assets/logo.png';
  }

  isValid() {
    debugger
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
    if (!(isValidFormat && this.selectedClass?.name && this.selectedClass?.number)) {
      this.error = "יש להזין שם כיתה";
      return;
    }
    else if (isValidFormat && this.selectedClass?.name && this.selectedClass?.number)
      this.getData();

  }
  getData() {
    // // this.router.navigate(['/matriculation-exam']);
    // this.isLoading = true;
    // const c = this.LoginServiceService.getUserById(new User(this.id, this.selectedClass?.name, this.selectedClass?.number)).subscribe();
    // this.isLoading = false;
    this.isLoading = true;
    this.LoginServiceService.getUserById(new User(this.id, this.selectedClass?.name, this.selectedClass?.number))
      .subscribe({
        next: (response) => {
          this.isLoading = false; // מפסיק את ה-spinner
          // this.router.navigate(['/matriculation-exam']);
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
    this.httpClient.get("https://matriculationexamserver.onrender.com/Matriculation/getClasses")
      .subscribe({
        next: (data) => {
          console.log("Classes:", data);
          this.classes = data;
        },
        error: (error) => {
          console.error("Error fetching classes:", error);
        }
      });


  }
}

