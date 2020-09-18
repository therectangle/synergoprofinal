import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestErgoComponent } from './request-ergo.component';

describe('RequestErgoComponent', () => {
  let component: RequestErgoComponent;
  let fixture: ComponentFixture<RequestErgoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequestErgoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestErgoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
