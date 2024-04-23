import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomAlertInputComponent } from './custom-alert-input.component';

describe('CustomAlertInputComponent', () => {
  let component: CustomAlertInputComponent;
  let fixture: ComponentFixture<CustomAlertInputComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CustomAlertInputComponent]
    });
    fixture = TestBed.createComponent(CustomAlertInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
