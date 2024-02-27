import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomAlertConfirmationComponent } from './custom-alert-confirmation.component';

describe('CustomAlertConfirmationComponent', () => {
  let component: CustomAlertConfirmationComponent;
  let fixture: ComponentFixture<CustomAlertConfirmationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CustomAlertConfirmationComponent]
    });
    fixture = TestBed.createComponent(CustomAlertConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
