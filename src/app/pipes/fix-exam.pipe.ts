import { Pipe, PipeTransform } from '@angular/core';
import { ExamList } from '../Types/Exam';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'fixExam',
  standalone: true
})
export class FixExamPipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}

  transform(examSubject: ExamList, ...args: unknown[]): unknown {
    if (examSubject.exams) {
      // מסנן רק בחינות צבעוניות (לא לבנות)
      const coloredExams = examSubject.exams.filter(exam => exam.colorCell !== 'white');
      
      // בודק שכל הבחינות הצבעוניות יש להן ציון
      const allHaveScores = coloredExams.every(exam => 
        exam.examScore !== '' && exam.examScore !== null && exam.examScore !== undefined
      );
      
      const finalExam = coloredExams.find(exam => exam.examName === 'ציון סופי');
      const finalScore = finalExam ? Number(finalExam.examScore) : null;
      
      if (allHaveScores && finalScore !== null && !isNaN(finalScore) && finalScore > 56) {
        return this.sanitizer.bypassSecurityTrustHtml(`
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-check2" viewBox="0 0 16 16">
            <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0"/>
          </svg>
        `);
      }
    }
    return '';
  }

}
