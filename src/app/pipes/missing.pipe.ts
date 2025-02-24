import { Pipe, PipeTransform } from '@angular/core';
import { Exam } from '../Types/Exam';

@Pipe({
  name: 'missing',
  standalone: true
})
export class MissingPipe implements PipeTransform {

  transform(exam: Exam, ...args: unknown[]): unknown {
  return (exam.colorCell !== 'white' && exam.examScore === "" )||exam.colorCell === 'red'? 'חסר' : exam.examScore;    
  }

}
