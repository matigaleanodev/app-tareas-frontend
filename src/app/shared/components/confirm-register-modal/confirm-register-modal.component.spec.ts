import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmRegisterModalComponent } from './confirm-register-modal.component';

describe('ConfirmRegisterModalComponent', () => {
  let component: ConfirmRegisterModalComponent;
  let fixture: ComponentFixture<ConfirmRegisterModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfirmRegisterModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfirmRegisterModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
