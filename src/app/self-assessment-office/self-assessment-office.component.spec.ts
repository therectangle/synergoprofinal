import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelfAssessmentOfficeComponent } from './self-assessment-office.component';

describe('SelfAssessmentOfficeComponent', () => {
  let component: SelfAssessmentOfficeComponent;
  let fixture: ComponentFixture<SelfAssessmentOfficeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelfAssessmentOfficeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelfAssessmentOfficeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
