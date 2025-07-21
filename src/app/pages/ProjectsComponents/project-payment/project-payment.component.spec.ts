import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectPaymentComponent } from './project-payment.component';

describe('ProjectPaymentComponent', () => {
  let component: ProjectPaymentComponent;
  let fixture: ComponentFixture<ProjectPaymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectPaymentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
