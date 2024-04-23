import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomAlertDatePickerComponent } from './custom-alert-date-picker.component';

describe('CustomAlertDatePickerComponent', () => {
  let component: CustomAlertDatePickerComponent;
  let fixture: ComponentFixture<CustomAlertDatePickerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CustomAlertDatePickerComponent]
    });
    fixture = TestBed.createComponent(CustomAlertDatePickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
