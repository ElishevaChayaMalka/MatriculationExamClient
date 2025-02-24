export class Exam {
    examScore?: string;
    colorCell?: string;
    examName?: string;
}
export class ExamList {
    subjectName?: string;
    exams?: Array<Exam>;

    constructor(  subjectName: string, exams: Array<Exam>) {
     this.subjectName = subjectName;
     this.exams = exams;
    }
}



