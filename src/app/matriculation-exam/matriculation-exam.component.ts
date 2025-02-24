import { Component, OnInit } from '@angular/core';
import { getData } from '../Services/getData.service';

import { CommonModule } from '@angular/common';
import { Exam, ExamList } from '../Types/Exam';
import { FixExamPipe } from '../pipes/fix-exam.pipe'; import { MissingPipe } from '../pipes/missing.pipe';
'../pipes/fix-exam.pipe'
@Component({
  selector: 'app-matriculation-exam',
  standalone: true,
  imports: [CommonModule, FixExamPipe, MissingPipe],
  templateUrl: './matriculation-exam.component.html',
  styleUrl: './matriculation-exam.component.scss'
})
export class MatriculationExamComponent implements OnInit {
  data: any[] = [];
  dataExams: any[] = [];
  currentExam: Exam[] = [];
  fullName: string = "";
  id: string = "";
  unitsMath: string = "";
  unitsEnglish: string = "";
  field: string = "";
  isLoading: boolean = false;

  constructor(private getDataService: getData) {

  }
  ngOnInit(): void {
    this.fullName = localStorage.getItem('name')?.toString() || '';
    this.id = localStorage.getItem('id')?.toString() || "";
    this.getExamsByUser();
  }

  async getExamsByUser() {
    // const token = localStorage.getItem('token') || '';
    this.isLoading = true;
    (await this.getDataService.getExamsByUser()).subscribe({
      next: (data) => {
        this.data = data;
        this.dataExam();
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error received:', err);
      }
    });



  }

  dataExam() {
    let currentSubject = '';
    debugger
    for (let i = 0; i < this.data.length; i++) {
      currentSubject = this.data[i].examSubject;
      if (currentSubject === 'מגמה') {
        this.field = this.data[i].examScore;
        i += 1;
      }
      while (currentSubject === this.data[i]?.examSubject) {
        if (this.data[i]?.examName?.includes("מס' יחידות") || this.data[i]?.examName?.includes('יח"ל')) {
          if (this.data[i].examSubject === 'אנגלית')
            this.unitsEnglish = this.data[i].examScore;
          if (this.data[i].examSubject === 'מתמטיקה')
            this.unitsMath = this.data[i].examScore;
        }
        else {
          this.currentExam.push({ colorCell: this.data[i].colorCell, examName: this.data[i].examName, examScore: this.data[i].examScore });
        }
        i++;
      }
      i--;
      if(currentSubject!="מגמה")
      this.dataExams.push(new ExamList(currentSubject, this.currentExam));
      this.currentExam = [];
    }
  }
}
