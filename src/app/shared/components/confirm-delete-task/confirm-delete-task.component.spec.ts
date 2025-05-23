import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmDeleteTaskComponent } from './confirm-delete-task.component';

describe('ConfirmDeleteTaskComponent', () => {
  let component: ConfirmDeleteTaskComponent;
  let fixture: ComponentFixture<ConfirmDeleteTaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfirmDeleteTaskComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfirmDeleteTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
