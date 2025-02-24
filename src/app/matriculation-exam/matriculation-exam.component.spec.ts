import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatriculationExamComponent } from './matriculation-exam.component';

describe('MatriculationExamComponent', () => {
  let component: MatriculationExamComponent;
  let fixture: ComponentFixture<MatriculationExamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatriculationExamComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MatriculationExamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
