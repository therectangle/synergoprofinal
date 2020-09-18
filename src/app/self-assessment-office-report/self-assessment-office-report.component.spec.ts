import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelfAssessmentOfficeReportComponent } from './self-assessment-office-report.component';

describe('SelfAssessmentOfficeReportComponent', () => {
  let component: SelfAssessmentOfficeReportComponent;
  let fixture: ComponentFixture<SelfAssessmentOfficeReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelfAssessmentOfficeReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelfAssessmentOfficeReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
