// import { FixExamPipe } from './fix-exam.pipe';

// describe('FixExamPipe', () => {
//   it('create an instance', () => {
//     const pipe = new FixExamPipe,();
//     expect(pipe).toBeTruthy();
//   });
// });
import { FixExamPipe } from './fix-exam.pipe';
import { DomSanitizer } from '@angular/platform-browser';
import { TestBed } from '@angular/core/testing';

describe('FixExamPipe', () => {
  let sanitizer: DomSanitizer;
  let pipe: FixExamPipe;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DomSanitizer]
    });
    sanitizer = TestBed.inject(DomSanitizer);
    pipe = new FixExamPipe(sanitizer);
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });
});
